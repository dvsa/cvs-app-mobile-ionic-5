import {createAction} from '@ngrx/store';
import { Log } from './logs.model';

export const saveLog = createAction(
  '[GLOBAL] Save Log',
  (log: Log) => ({ log }),
  );

export const saveAppVersionToLog = createAction(
  '[GLOBAL] Save App version to Log',
);

export const startSendingLogs = createAction(
  '[AppComponent] Start Sending Logs',
);

export const sendLogs = createAction(
  '[LogsEffects] Send Logs',
);

export const sendLogsSuccess = createAction(
  '[LogsEffects] Send Logs Success',
);

export const sendLogsFailure = createAction(
  '[LogsEffects] Send Logs Failure',
  (error: any) => ({ error })
);

export const persistLogs = createAction(
  '[LogsEffects] Persist Logs',
);

export const loadLog = createAction(
  '[GLOBAL] Load Logs',
);

export const loadLogState = createAction(
  '[GLOBAL] Load Log State',
  (logs: Log[]) => ({logs})
);
