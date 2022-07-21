import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { from, of } from 'rxjs';
import {
  switchMap,
  toArray,
  filter,
  mergeMap
} from 'rxjs/operators';

import { Storage } from '@ionic/storage';

import { Log, LogsModel } from './logs.model';
import { HTTPService } from '@providers/global/http.service';
import { saveLog } from './logs.actions';
import { STORAGE } from '@app/app.enums';
import { DataStoreProvider } from '@store/logs/data-store.service';

type LogCache = {
  dateStored: string;
  data: Log[];
};

@Injectable()
export class LogsProvider {

  constructor(
    private httpService: HTTPService,
    private store$: Store<LogsModel>,
    private storage: Storage,
    private dataStore: DataStoreProvider,
  ) { }

  public sendLogs = (logs: Log[]): Observable<any> => {
    if (logs && logs.length === 0) {
      return of();
    }

    return from(logs)
      .pipe(
        filter((log: Log) => !log.unauthenticated),
        mergeMap(async (log) => ({
          ...log,
          latestVersion: await this.storage.get(STORAGE.LATEST_VERSION),
          appVersion: await this.storage.get(STORAGE.APP_VERSION),
          employeeId: await this.storage.get(STORAGE.EMPLOYEE_ID),
        })),
        toArray(),
        switchMap((authLogs: Log[]) => this.httpService.sendAuthenticatedLogs(authLogs)),
      );
  };

  public sendUnauthLogs = (logs: Log[]): Observable<any> => {
    if (logs && logs.length === 0) {
      return of();
    }

    return from(logs)
      .pipe(
        filter((log: Log) => log.unauthenticated),
        mergeMap(async (log) => ({
          ...log,
          latestVersion: await this.storage.get(STORAGE.LATEST_VERSION),
          appVersion: await this.storage.get(STORAGE.APP_VERSION),
          employeeId: await this.storage.get(STORAGE.EMPLOYEE_ID),
        })),
        toArray(),
        switchMap((unAuthLogs: Log[]) => this.httpService.sendUnauthenticatedLogs(unAuthLogs)),
      );
  };

  public dispatchLog(log: Log): void {
    this.store$.dispatch(saveLog(log));
  }

  public saveLogs = (logData: Log[]) => {
    const logDataToStore: LogCache = {
      dateStored: new Date().toISOString(),
      data: logData
    };
    this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then((response) => {});
  };

  public getPersistedLogs = (): Observable<Log[]> => from(this.getAndConvertPersistedLogs());

  public getAndConvertPersistedLogs = (): Promise<Log[]> =>
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

  public isCacheTooOld = (dateStored: Date, now: Date): boolean => (
    Math.floor(
      (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
        Date.UTC(dateStored.getFullYear(), dateStored.getMonth(), dateStored.getDate())) /
      (1000 * 60 * 60 * 24)
    ) > 7
  );

  public emptyCachedData = () => {
    const emptyLogData: Log[] = [];
    const logDataToStore: LogCache = {
      dateStored: new Date().toISOString(),
      data: emptyLogData
    };
    this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then(() => {});
    return emptyLogData;
  };
}
