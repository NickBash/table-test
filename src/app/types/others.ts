import {
  ControllerEventTargetType,
  ControllerEventType,
  MpcEventLevel,
} from '../enums/all';

export type ControllerEventsOptions = {
  lastTimestamp?: string;
  lastId?: string;
  from?: string;
  to?: string;
  type?: ControllerEventType[];
  level?: MpcEventLevel[];
  userName?: string;
  targetType?: ControllerEventTargetType[];
  targetId?: string;
  targetName?: string;
  targetProperty?: string;
};
