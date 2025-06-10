export enum ControllerEventType {
  Calculated = 'calculated',
  TurnedOff = 'turnedOff',
  PvHistoryCountLessThanModelLength = 'pvHistoryCountLessThanModelLength',
  UnhandledException = 'unhandledException',
  PropertyChanged = 'propertyChanged',
}

export enum MpcEventLevel {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Debug = 'debug',
  Critical = 'critical',
}

export enum ControllerEventTargetType {
  Controller = 'controller',
  Cv = 'cv',
  Mv = 'mv',
  TransferMatrix = 'transferMatrix',
}
