import { Component, inject, OnInit, signal } from '@angular/core';
import { ExchangeService } from './services/exchange.service';
import { CvVariable } from './types/controller-types';
import { TABLE_CV_HEADER } from './constants/table-cv-header';
import { UniversalTableComponent } from './universal-table/universal-table.component';
import { EventLog } from './types/event-log';
import { TABLE_EVENT_LOG_HEADER } from './constants/table-event-log-header';
import { ControllerEventsOptions } from './types/others';
import {
  ControllerEventTargetType,
  ControllerEventType,
  MpcEventLevel,
} from './enums/all';

@Component({
  selector: 'app-root',
  imports: [UniversalTableComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly exchangeService = inject(ExchangeService);

  tableCvRows = signal<CvVariable[]>([]);
  tableEventLogRows = signal<EventLog[]>([]);
  TABLE_CV_HEADER = TABLE_CV_HEADER;
  TABLE_EVENT_LOG_HEADER = TABLE_EVENT_LOG_HEADER;

  ngOnInit(): void {
    this.exchangeService.controllerUpdateEvent$.subscribe((data) => {
      if (data) {
        this.tableCvRows.set(data.cvs);
      }
    });

    this.exchangeService.updateControllerData();

    this.exchangeService.eventLogEvent$.subscribe((data) => {
      if (data) {
        this.tableEventLogRows.set(data);
      }
    });

    this.exchangeService.updateEventLogs();
  }

  changeFiltersEventLog(v: Record<string, unknown>) {
    const options = this.mapToControllerEventsOptions(v);

    console.log(options);
  }

  // в сервис или утилиту
  mapToControllerEventsOptions(
    data: Record<string, unknown>,
  ): ControllerEventsOptions {
    return {
      lastTimestamp: this.isString(data['lastTimestamp'])
        ? data['lastTimestamp']
        : undefined,
      lastId: this.isString(data['lastId']) ? data['lastId'] : undefined,
      from: this.isString(data['from']) ? data['from'] : undefined,
      to: this.isString(data['to']) ? data['to'] : undefined,
      type: this.isArray<ControllerEventType>(data['type'])
        ? (data['type'] as ControllerEventType[])
        : undefined,
      level: this.isArray<MpcEventLevel>(data['level'])
        ? (data['level'] as MpcEventLevel[])
        : undefined,
      userName: this.isString(data['userName']) ? data['userName'] : undefined,
      targetType: this.isArray<ControllerEventTargetType>(data['targetType'])
        ? (data['targetType'] as ControllerEventTargetType[])
        : undefined,
      targetId: this.isString(data['targetId']) ? data['targetId'] : undefined,
      targetName: this.isString(data['targetName'])
        ? data['targetName']
        : undefined,
      targetProperty: this.isString(data['targetProperty'])
        ? data['targetProperty']
        : undefined,
    };
  }

  isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value);
  }
}
