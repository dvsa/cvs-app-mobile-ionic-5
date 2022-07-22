import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';

import { Log, LogsModel, LogType } from './logs.model';
import { HTTPService } from '@providers/global/http.service';
import { LogsProvider } from './logs.service';
import { saveLog } from './logs.actions';
import { MockStore } from './logs.service.mock';
import { LOG_TYPES, STORAGE } from '@app/app.enums';
import { Storage } from '@ionic/storage';
import { StorageServiceMock } from '@test-config/services-mocks/storage-service.mock';
import * as logsActions from '@store/logs/logs.actions';
import { LogsEffects } from '@store/logs/logs.effects';
import { DataStoreProvider } from '@store/logs/data-store.service';
import { DataStoreProviderMock } from '@store/logs/data-store.service.mock';
import { provideMockActions } from '@ngrx/effects/testing';
import { Network } from '@ionic-native/network/ngx';
import { NetworkMock } from 'ionic-mocks';
import { NetworkService } from '@providers/global';
import { logsReducer } from '@store/logs/logs.reducer';

const mockLog = () => ({
    type: LOG_TYPES.INFO,
    message: 'this should log',
    timestamp: 99338
  } as Log);

describe('LogsProvider', () => {
  let httpServiceSpy: any;
  let httpService: HTTPService;
  let logProvider: LogsProvider;
  let dataStoreMock: DataStoreProvider;
  let effects: LogsEffects;
  let storage: Storage;
  let actions$: any;
  // const store: MockStore<LogsModel> = new MockStore<LogsModel>();
  let store: any;
  const additionalInfo = {latestVersion: '2.0', appVersion: '1.0', employeeId: '123456'};

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HTTPService', {
      sendAuthenticatedLogs: of('authenticated logs sent'),
      sendUnauthenticatedLogs: of('unauthenticated logs sent')
    });

    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          logs: logsReducer
        })
      ],
      providers: [
        LogsProvider,
        { provide: HTTPService, useValue: httpServiceSpy },
        Store,
        { provide: Storage, useClass: StorageServiceMock },
        provideMockActions(() => actions$),
        { provide: Network, useFactory: () => NetworkMock.instance('wifi') },
        NetworkService,
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
        LogsEffects,
      ]
    });

    httpService = TestBed.inject(HTTPService);
    logProvider = TestBed.inject(LogsProvider);
    effects = TestBed.inject(LogsEffects);
    storage = TestBed.inject(Storage);
    dataStoreMock = TestBed.inject(DataStoreProvider);
    store = TestBed.inject(Store);

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

  describe('persistLogs', () => {
    it('should call saveLogs', (done) => {
      // ARRANGE
      spyOn(logProvider, 'saveLogs').and.callThrough();
      // ACT
      actions$.next(logsActions.persistLogs());
      // ASSERT
      effects.persistLogEffect$.subscribe((result) => {
        expect(logProvider.saveLogs).toHaveBeenCalled();
        expect(result.type).toBeTruthy();
        done();
      });
    });
  });

  describe('LoadLog', () => {
    it('should call getPersistedLogs and return LoadLogState', fakeAsync((done) => {
      // ARRANGE
      spyOn(logProvider, 'getPersistedLogs').and.callThrough();
      // ACT
      actions$.next(logsActions.loadLog());
      tick();
      // ASSERT
      effects.persistLogEffect$.subscribe((result) => {
        expect(logProvider.getPersistedLogs).toHaveBeenCalled();
        expect(result instanceof logsActions.loadLogState).toBe(true);
        done();
      });
    }));
  });

  describe('getAndConvertPersistedLogs', () => {
    it('should return data without emptying cache if data is not too old', (done) => {
      const log: Log = {
        ['test']: 'xyz',
        type: LogType.DEBUG,
        message: 'test',
        timestamp: 1234567
      };
      const dataWthinWindowCache = {
        data: log
      };

      // override mock getItem as we need data to test
      // @ts-ignore
      dataStoreMock.getItem.and.callFake(() =>
        Promise.resolve(JSON.stringify(dataWthinWindowCache))
      );

      spyOn(logProvider, 'emptyCachedData').and.callThrough();

      logProvider.getAndConvertPersistedLogs().then(() => {
        expect(logProvider.emptyCachedData).toHaveBeenCalledTimes(0);
        expect(dataStoreMock.setItem).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
