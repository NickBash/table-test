import { TableColumnFilterType } from '../enums/table-column-filter-type';
import { EventLog } from '../types/event-log';
import { getLatestTime } from '../utils/get-latest-time';
import { ColumnItem } from './table-cv-header';

export const TABLE_EVENT_LOG_HEADER: ColumnItem<EventLog>[] = [
  {
    key: 'timestamp',
    name: 'Дата',
    dataType: 'string',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    filterOptions: {
      filterType: TableColumnFilterType.DateTimeRangeFilter,
      data: [getLatestTime(7 * 24), new Date()],
    },
    isResizable: true,
  },
  {
    key: 'level',
    name: 'Тип события',
    dataType: 'string',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    displayMapping: [
      { label: 'Уведомление', value: 'info' },
      { label: 'Предупреждение', value: 'warning' },
      { label: 'Ошибка', value: 'error' },
      { label: 'Отладка', value: 'debug' },
      { label: 'Критическая ошибка', value: 'critical' },
    ],
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    filterOptions: {
      filterType: TableColumnFilterType.CheckboxFilter,
      data: [
        { label: 'Уведомление', value: 'info' },
        { label: 'Предупреждение', value: 'warning' },
        { label: 'Ошибка', value: 'error' },
        { label: 'Отладка', value: 'debug' },
        { label: 'Критическая ошибка', value: 'critical' },
      ],
    },
    isResizable: true,
  },
  {
    key: 'type',
    name: 'Наименование события',
    dataType: 'string',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    displayMapping: [
      { label: 'Расчет', value: 'calculated' },
      { label: 'Отключен', value: 'turnedOff' },
      {
        label: 'Недостаточно истории по PV',
        value: 'pvHistoryCountLessThanModelLength',
      },
      { label: 'Необработанная ошибка', value: 'unhandledException' },
      { label: 'Изменилось значение', value: 'propertyChanged' },
    ],
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    filterOptions: {
      filterType: TableColumnFilterType.CheckboxFilter,
      data: [
        { label: 'Расчет', value: 'calculated' },
        { label: 'Отключен', value: 'turnedOff' },
        {
          label: 'Недостаточно истории по PV',
          value: 'pvHistoryCountLessThanModelLength',
        },
        { label: 'Необработанная ошибка', value: 'unhandledException' },
        { label: 'Изменилось значение', value: 'propertyChanged' },
      ],
    },
    isResizable: true,
  },
  {
    key: 'userName',
    name: 'Пользователь',
    dataType: 'string',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    filterOptions: {
      filterType: TableColumnFilterType.SearchFilter,
      data: '',
    },
    isResizable: true,
  },
  {
    key: 'targetType',
    name: 'Тип объекта',
    dataType: 'string',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    displayMapping: [
      { label: 'Контроллер', value: 'controller' },
      { label: 'CV', value: 'cv' },
      { label: 'MV', value: 'mv' },
      { label: 'Трансферная матрица', value: 'transferMatrix' },
    ],
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    filterOptions: {
      filterType: TableColumnFilterType.CheckboxFilter,
      data: [
        { label: 'Контроллер', value: 'controller' },
        { label: 'CV', value: 'cv' },
        { label: 'MV', value: 'mv' },
        { label: 'Трансферная матрица', value: 'transferMatrix' },
      ],
    },
    isResizable: true,
  },
  {
    key: 'targetName',
    name: 'Название переменной',
    dataType: 'string',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    filterOptions: {
      filterType: TableColumnFilterType.SearchFilter,
      data: '',
    },
    isResizable: true,
  },
  {
    key: 'description',
    name: 'Описание',
    dataType: 'string',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    isResizable: true,
  },
];
