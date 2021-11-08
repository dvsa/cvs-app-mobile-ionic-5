import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { Log, LogsModel } from './logs.model';
import { HTTPService } from '@providers/global/http.service';
import { LogsProvider } from './logs.service';
import { saveLog } from './logs.actions';
import { MockStore } from './logs.service.mock';
import { LOG_TYPES, STORAGE } from '@app/app.enums';
import { Storage } from '@ionic/storage';
import { StorageServiceMock } from '@test-config/services-mocks/storage-service.mock';

const mockLog = () => ({
    type: LOG_TYPES.INFO,
    message: 'this should log',
    timestamp: 99338
  } as Log);

describe('LogsProvider', () => {
  let httpServiceSpy: any;
  let httpService: HTTPService;
  let logProvider: LogsProvider;
  let storage: Storage;
  const store: MockStore<LogsModel> = new MockStore<LogsModel>();
  const additionalInfo = {latestVersion: '2.0', appVersion: '1.0', employeeId: '123456'};

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HTTPService', {
      sendAuthenticatedLogs: of('authenticated logs sent'),
      sendUnauthenticatedLogs: of('unauthenticated logs sent')
    });

    TestBed.configureTestingModule({
      providers: [
        LogsProvider,
        { provide: HTTPService, useValue: httpServiceSpy },
        { provide: Store, useValue: store },
        { provide: Storage, useClass: StorageServiceMock }
      ]
    });

    httpService = TestBed.inject(HTTPService);
    logProvider = TestBed.inject(LogsProvider);
    storage = TestBed.inject(Storage);

    spyOn(store, 'dispatch');
    spyOn(storage, 'get').and.callFake((key: string) => {
      if(key === STORAGE.LATEST_VERSION) {return Promise.resolve('2.0');}
      if(key === STORAGE.APP_VERSION) {return Promise.resolve('1.0');}
      if(key === STORAGE.EMPLOYEE_ID) {return Promise.resolve('123456');}
      return Promise.resolve('');
    });
  });

  describe('sendLogs', () => {

    it('should send authenticated logs', async () => {
      const logs: Log[] = [{ ...mockLog() }, mockLog()];
      const expectedCallArgs = [{...mockLog(), ...additionalInfo}, {...mockLog(), ...additionalInfo}];
      await logProvider.sendLogs(logs).toPromise();
      expect(httpService.sendAuthenticatedLogs).toHaveBeenCalledWith(expectedCallArgs);
    });
  });

  describe('sendUnauthLogs', () => {
    it('should send unauthenticated logs', async () => {
      const unAuthLog: Log = {
        ...mockLog(),
        unauthenticated: true
      };
      const expectedArgs = [{...unAuthLog, ...additionalInfo}];
      const logs: Log[] = [unAuthLog, mockLog()];
      await logProvider.sendUnauthLogs(logs).toPromise();
      expect(httpService.sendUnauthenticatedLogs).toHaveBeenCalledWith(expectedArgs);
    });
  });

  describe('dispatchLog', () => {
    it('should dispatch the SaveLog action', () => {
      logProvider.dispatchLog(mockLog());

      expect(store.dispatch).toHaveBeenCalledWith(saveLog(mockLog()));
    });
  });
});
