import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import {of, interval, Observable, from, forkJoin} from 'rxjs';

import * as logsActions from './logs.actions';
import { getLogsState } from './logs.reducer';
import { LogsProvider } from './logs.service';
import { Log, LogsModel } from './logs.model';
import { DataStoreProvider } from './data-store.service';
import { NetworkService } from '@providers/global';
import { CONNECTION_STATUS } from '@app/app.enums';

type LogCache = {
  dateStored: string;
  data: Log[];
};

@Injectable()
export class LogsEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<LogsModel>,
    private logsProvider: LogsProvider,
    private dataStore: DataStoreProvider,
    private networkService: NetworkService
  ) {}

  startSendingLogsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logsActions.startSendingLogs),
    switchMap(() => interval(60 * 1000).pipe(map(() => logsActions.sendLogs())))
  ));

  persistLogEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logsActions.persistLogs),
    withLatestFrom(this.store$.pipe(select(getLogsState))),
    switchMap(([, logs]) => {
      this.saveLogs(logs);
      return of({type: '[LogsEffects] Persist Log Finished'});
    })
  ));

  loadLogEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logsActions.loadLog),
    switchMap(() => this.getPersistedLogs().pipe(
        map((logs: Log[]) => logsActions.loadLogState(logs))
      ))
  ));

  saveLogEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logsActions.saveLog),
    switchMap(() => of(logsActions.persistLogs()))
  ));

  sendLogsSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logsActions.sendLogsSuccess),
    switchMap(() => of(logsActions.persistLogs()))
  ));

  sendLogsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(logsActions.sendLogs),
    withLatestFrom(this.store$.pipe(select(getLogsState))),
    switchMap(([action, logs]) => {
      if (this.networkService.getNetworkState() === CONNECTION_STATUS.OFFLINE) {
        return of({type: '[LogsEffects] Offline - Unable to send logs'});
      }
      forkJoin([
        this.logsProvider.sendLogs(logs),
        this.logsProvider.sendUnauthLogs(logs)
      ]).pipe(
        tap(async () => await this.dataStore.setItem('LOGS', [])),
        map(() => logsActions.sendLogsSuccess()),
        catchError((err: any) => of(logsActions.sendLogsFailure(err))),
      );
    })
  ));

  // TODO: All this has to be moved to the LogsProvider or DataStore provider

  getPersistedLogs = (): Observable<Log[]> => from(this.getAndConvertPersistedLogs());

  getAndConvertPersistedLogs = (): Promise<Log[]> =>
    this.dataStore
      .getItem('LOGS')
      .then((data) => {
        const logCache: LogCache = JSON.parse(data);
        const cachedDate = new Date(logCache.dateStored);
        if (this.isCacheTooOld(cachedDate, new Date())) {
          return this.emptyCachedData();
        }
        return logCache.data;
      })
      .catch(() => {
        const emptyLogData: Log[] = [];
        return emptyLogData;
      });

  saveLogs = (logData: Log[]) => {
    const logDataToStore: LogCache = {
      dateStored: new Date().toISOString(),
      data: logData
    };
    this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then((response) => {});
  };

  isCacheTooOld = (dateStored: Date, now: Date): boolean => (
      Math.floor(
        (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
          Date.UTC(dateStored.getFullYear(), dateStored.getMonth(), dateStored.getDate())) /
          (1000 * 60 * 60 * 24)
      ) > 7
    );

  emptyCachedData = () => {
    const emptyLogData: Log[] = [];
    const logDataToStore: LogCache = {
      dateStored: new Date().toISOString(),
      data: emptyLogData
    };
    this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then(() => {});
    return emptyLogData;
  };
}
