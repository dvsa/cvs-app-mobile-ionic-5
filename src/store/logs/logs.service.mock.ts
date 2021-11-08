import { Action } from '@ngrx/store';

export class LogsProviderMock {
  sendLogs = jasmine.createSpy('sendLogs');
  dispatchLog = jasmine.createSpy('dispatchLog');
}

export class MockStore<T> {
  constructor() {}

  dispatch(action: Action) {
    return [];
  }
}
