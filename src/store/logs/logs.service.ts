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

@Injectable()
export class LogsProvider {

  constructor(
    private httpService: HTTPService,
    private store$: Store<LogsModel>,
    private storage: Storage,
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
}
