export type LogsModel = Log[];

export type Log = {
  type: string;
  message: string;
  timestamp: number;
  [propName: string]: any;
};

export enum LogType {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}
