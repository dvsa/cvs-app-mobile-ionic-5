import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-enterprise/network-information/ngx';
import { NetworkMock, PlatformMock } from 'ionic-mocks';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Store } from '@ngrx/store';

import { LogsEffects } from './logs.effects';
import * as logsActions from './logs.actions';
import { Log, LogType } from './logs.model';
import { LogsProviderMock } from './logs.service.mock';
import { LogsProvider } from './logs.service';
import { logsReducer } from './logs.reducer';
import { DataStoreProvider } from './data-store.service';
import { DataStoreProviderMock } from './data-store.service.mock';
import { NetworkService } from '@providers/global/network.service';

describe('Logs Effects', () => {
  let effects: LogsEffects;
  let actions$: any;
  let dataStoreMock: DataStoreProvider;

  beforeEach(() => {
    // ARRANGE
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          logs: logsReducer
        })
      ],
      providers: [
        LogsEffects,
        NetworkService,
        provideMockActions(() => actions$),
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: Network, useFactory: () => NetworkMock.instance('wifi') },
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
        { provide: LogsProvider, useClass: LogsProviderMock },
        Store
      ]
    });
    effects = TestBed.inject(LogsEffects);
    dataStoreMock = TestBed.inject(DataStoreProvider);
  });

  it('should create the logs effects', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch the persist logs action when the logs post successfully', (done) => {
    // ACT
    actions$.next(logsActions.sendLogsSuccess());
    // ASSERT
    effects.sendLogsSuccessEffect$.subscribe((result) => {
      expect(result.type).toEqual(logsActions.persistLogs.type);
      done();
    });
  });

  it('should dispatch the persist logs action when an individual log is added', (done) => {
    // ARRANGE
    const log: Log = {
      ['test']: 'xyz',
      type: LogType.DEBUG,
      message: 'test',
      timestamp: 1234567
    };
    // ACT
    actions$.next(logsActions.saveLog(log));
    // ASSERT
    effects.saveLogEffect$.subscribe((result) => {
      expect(result.type).toEqual(logsActions.persistLogs.type);
      done();
    });
  });

  // @TODO - Ionic 5 - fix  unit tests

  // describe('persistLogs', () => {
  //   it('should call saveLogs', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(effects, 'saveLogs').and.callThrough();
  //     // ACT
  //     actions$.next(logsActions.persistLogs());
  //     tick();
  //     // ASSERT
  //     effects.persistLogEffect$.subscribe((result) => {
  //       expect(effects.saveLogs).toHaveBeenCalled();
  //       expect(result.type).toBeTruthy();
  //       done();
  //     });
  //   }));
  // });

  // describe('LoadLog', () => {
  //   it('should call getPersistedLogs and return LoadLogState', fakeAsync((done) => {
  //     // ARRANGE
  //     spyOn(effects, 'getPersistedLogs').and.callThrough();
  //     // ACT
  //     actions$.next(new logsActions.LoadLog());
  //     tick();
  //     // ASSERT
  //     effects.persistLogEffect$.subscribe((result) => {
  //       expect(effects.getPersistedLogs).toHaveBeenCalled();
  //       expect(result instanceof logsActions.LoadLogState).toBe(true);
  //       done();
  //     });
  //   }));
  // });

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

      spyOn(effects, 'emptyCachedData').and.callThrough();

      effects.getAndConvertPersistedLogs().then(() => {
        expect(effects.emptyCachedData).toHaveBeenCalledTimes(0);
        expect(dataStoreMock.setItem).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
