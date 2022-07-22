import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
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


});
