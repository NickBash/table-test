import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { faker } from '@faker-js/faker';
import { ControllerVariables, CvVariable } from '../types/controller-types';
import { EventLog } from '../types/event-log';
import {
  ControllerEventTargetType,
  ControllerEventType,
  MpcEventLevel,
} from '../enums/all';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private controllerUpdateSubject =
    new BehaviorSubject<ControllerVariables | null>(null);
  public controllerUpdateEvent$: Observable<ControllerVariables | null> =
    this.controllerUpdateSubject.asObservable();

  private eventLogSubject = new BehaviorSubject<EventLog[] | null>(null);
  public eventLogEvent$: Observable<EventLog[] | null> =
    this.eventLogSubject.asObservable();

  constructor() {}

  generateFakeCvVariables(count: number = 5): CvVariable[] {
    const variables: CvVariable[] = [];

    for (let i = 0; i < count; i++) {
      variables.push({
        id: i + 1,
        controllerId: Math.floor(Math.random() * 100) + 1,
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        description: faker.lorem.sentence(),
        order: i + 1,
        units: ['kW', 'V', 'A', '°C', 'm/s'][Math.floor(Math.random() * 5)],
        isCritical: Math.random() > 0.5 ? 'true' : 'false',
        lowEngineeringLimit: Math.floor(Math.random() * 100),
        highEngineeringLimit: Math.floor(Math.random() * 100) + 100,
        weight: parseFloat((Math.random() * 10).toFixed(2)),
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as
          | 'low'
          | 'medium'
          | 'high',
        linearCoefficient: parseFloat((Math.random() * 10).toFixed(2)),
        quadraticCoefficient: parseFloat((Math.random() * 10).toFixed(2)),
        qpTarget: Math.floor(Math.random() * 100),
        lowSoftLimit: Math.floor(Math.random() * 100),
        highSoftLimit: Math.floor(Math.random() * 100) + 100,
        softLimitRate: parseFloat((Math.random() * 10).toFixed(2)),
        optimizationRate: parseFloat((Math.random() * 10).toFixed(2)),
        status: ['active', 'inactive', null][Math.floor(Math.random() * 3)] as
          | 'active'
          | 'inactive'
          | null,
        lowLimit: Math.floor(Math.random() * 100),
        highLimit: Math.floor(Math.random() * 100) + 100,
        value: Math.floor(Math.random() * 100),
        predictedValue: Math.floor(Math.random() * 100),
      });
    }

    return variables;
  }

  updateControllerData(): void {
    const data: ControllerVariables = {
      cvs: this.generateFakeCvVariables(10),
    };

    this.controllerUpdateSubject.next(data);
  }

  getControllerData(): ControllerVariables | null {
    return this.controllerUpdateSubject.value;
  }

  generateFakeEventLogs(count: number = 10): EventLog[] {
    const logs: EventLog[] = [];

    for (let i = 0; i < count; i++) {
      logs.push({
        id: faker.string.uuid(),
        timestamp: faker.date.recent().toISOString(),
        controllerName: `Controller-${Math.floor(Math.random() * 100) + 1}`,
        type: Object.values(ControllerEventType)[
          Math.floor(
            (Math.random() * Object.keys(ControllerEventType).length) / 2,
          )
        ] as ControllerEventType,
        level: Object.values(MpcEventLevel)[
          Math.floor((Math.random() * Object.keys(MpcEventLevel).length) / 2)
        ] as MpcEventLevel,
        userName: Math.random() > 0.5 ? faker.person.fullName() : null,
        targetType:
          Math.random() > 0.5
            ? (Object.values(ControllerEventTargetType)[
                Math.floor(
                  (Math.random() *
                    Object.keys(ControllerEventTargetType).length) /
                    2,
                )
              ] as ControllerEventTargetType)
            : null,
        targetName: Math.random() > 0.5 ? `${faker.word.noun()} ${i}` : null,
        description: Math.random() > 0.5 ? faker.lorem.sentence() : null,
      });
    }

    return logs;
  }

  updateEventLogs(): void {
    const logs = this.generateFakeEventLogs(10);
    this.eventLogSubject.next(logs);
  }

  getEventLogs(): EventLog[] | null {
    return this.eventLogSubject.value;
  }
}
