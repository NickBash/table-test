import {
  ControllerEventTargetType,
  ControllerEventType,
  MpcEventLevel,
} from '../enums/all';

export type EventLog = {
  id: string;
  timestamp: string;
  controllerName: string;
  type: ControllerEventType;
  level: MpcEventLevel;
  userName: string | null;
  targetType: ControllerEventTargetType | null;
  targetName: string | null;
  description: string | null;
};
