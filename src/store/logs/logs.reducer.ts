import {createFeatureSelector, createReducer, on} from '@ngrx/store';

import { LogsModel } from './logs.model';
import * as logsActions from './logs.actions';

export const initialState: LogsModel = [];

export const logsReducer = createReducer(
  initialState,
  on(logsActions.saveLog, (state: LogsModel, {log}) => ([
    ...state,
    log,
  ])),
  on(logsActions.sendLogsSuccess,
    () => (initialState)),
  on(logsActions.loadLogState,
    (state: LogsModel, {logs}) => ([
      ...state,
      ...logs,
    ])),
);

export const getLogsState = createFeatureSelector<LogsModel>('logs');
