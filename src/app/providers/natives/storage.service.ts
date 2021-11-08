import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject, Observable } from 'rxjs';

import { LOG_TYPES } from '@app/app.enums';
import { LogsProvider } from '@store/logs/logs.service';
import { AuthenticationService } from '@providers/auth';

@Injectable()
export class StorageService {
  private storageSub = new Subject<any>();

  constructor(
    private storage: Storage,
    private logProvider: LogsProvider,
    private authenticationService: AuthenticationService
  ) {}

  create(key: string, dataArray: any | any[]): Promise<any> {
    return this.storage.set(key, dataArray);
  }

  read(key: string): Promise<any> {
    return this.storage.get(key).then((data: any) => {
      this.logProvider.dispatchLog({
        type: LOG_TYPES.INFO,
        message: `User ${this.authenticationService.tokenInfo.oid} read storage key ${key}`,
        timestamp: Date.now()
      });

      return data;
    });
  }

  update(key, value): Promise<any> {
    return this.storage.remove(key).then((data: any) => this.storage.set(key, value).then((done: any) => {
        this.logProvider.dispatchLog({
          type: LOG_TYPES.INFO,
          message: `User ${this.authenticationService.tokenInfo.oid} write storage key ${key}`,
          timestamp: Date.now()
        });

        return done;
      }));
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next();
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storageSub.next();
  }

  delete(key: string): Promise<any> {
    return this.storage.remove(key).then((data) => data);
  }

  clearStorage(): Promise<any> {
    return this.storage.clear().then((data) => data);
  }
}
