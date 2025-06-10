import { TableColumnFilterType } from '../enums/table-column-filter-type';
import { CvVariable } from '../types/controller-types';

export type SelectOptions = {
  label: string;
  value: string | boolean | number;
};

export type CheckboxOptions = {
  label: string;
  value: string;
  byDefault?: boolean;
};

export type DateTimeRangeFilterOptions = {
  filterType: TableColumnFilterType.DateTimeRangeFilter;
  data: Date[];
};

export type SearchFilterOptions = {
  filterType: TableColumnFilterType.SearchFilter;
  data: string;
};

export type CheckboxFilterOptions = {
  filterType: TableColumnFilterType.CheckboxFilter;
  data: CheckboxOptions[];
};

type FilterOptionsMap = {
  [TableColumnFilterType.DateTimeRangeFilter]: DateTimeRangeFilterOptions;
  [TableColumnFilterType.SearchFilter]: SearchFilterOptions;
  [TableColumnFilterType.CheckboxFilter]: CheckboxFilterOptions;
};

export type FilterOptions = FilterOptionsMap[keyof FilterOptionsMap];

type DateTimeRangeFilterEvent = {
  filterType: TableColumnFilterType.DateTimeRangeFilter;
  data: Date[];
};

type SearchFilterEvent = {
  filterType: TableColumnFilterType.SearchFilter;
  data: string;
};

type CheckboxFilterEvent = {
  filterType: TableColumnFilterType.CheckboxFilter;
  data: string[];
};

type FilterEventMap = {
  [TableColumnFilterType.DateTimeRangeFilter]: DateTimeRangeFilterEvent;
  [TableColumnFilterType.SearchFilter]: SearchFilterEvent;
  [TableColumnFilterType.CheckboxFilter]: CheckboxFilterEvent;
};

export type FilterEvent = FilterEventMap[keyof FilterEventMap];

export type FilterEventColumn<T> = {
  key: keyof T;
  filterEvent: FilterEvent;
};

type ClickEvent = {
  eventType: string;
  eventArgs?: {
    [key: string]: any;
  };
};

type DisplayMapping = {
  label: string;
  value: string | boolean | number;
};

export type ColumnItem<T> = {
  name: string;
  key: Extract<keyof T, string>;
  dataType: 'string' | 'number' | 'boolean';
  nullValue: string;
  isFixed?: boolean;
  editType: 'static' | 'input' | 'select';
  selectOptions?: SelectOptions[]; // опция которая участвует при формирование InputSelect когда указана настройка editType: 'select'
  displayMapping?: DisplayMapping[]; // опция которая отвечает за отображения данных (выступает как translate), если настройка editType указана как 'static'
  // labels?: string[];
  onClickEvent: ClickEvent;
  isResizable?: boolean;
  isContextMenu?: boolean;
  permissions?: string[];
  filterOptions?: FilterOptions;
};

export const TABLE_CV_HEADER: ColumnItem<CvVariable>[] = [
  {
    key: 'order',
    name: 'CV#',
    dataType: 'number',
    nullValue: '',
    isFixed: true,
    editType: 'static',
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    isResizable: true,
  },
  {
    key: 'name',
    name: 'Имя CV',
    dataType: 'string',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    onClickEvent: {
      eventType: 'followLink',
      eventArgs: {
        link: 'test-test',
      },
    },
    isResizable: true,
    isContextMenu: true,
  },
  {
    key: 'description',
    name: 'Описание CV',
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
  {
    key: 'status',
    name: 'Статус CV',
    dataType: 'string',
    nullValue: '',
    isFixed: false,
    editType: 'select',
    selectOptions: [
      { label: 'Вкл', value: 'on' },
      { label: 'Откл', value: 'off' },
    ],
    // labels: ['on', 'off'],
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    isResizable: true,
  },
  {
    key: 'value',
    name: 'Значение',
    dataType: 'number',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    isResizable: true,
  },
  {
    key: 'predictedValue',
    name: 'Прогноз',
    dataType: 'number',
    nullValue: '',
    isFixed: false,
    editType: 'static',
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    isResizable: true,
  },
  {
    key: 'lowLimit',
    name: 'Нижний предел',
    dataType: 'number',
    nullValue: '',
    isFixed: false,
    editType: 'input',
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    isResizable: true,
  },
  {
    key: 'highLimit',
    name: 'Верхний предел',
    dataType: 'number',
    nullValue: '',
    isFixed: false,
    editType: 'input',
    onClickEvent: {
      eventType: 'nothing',
      eventArgs: {},
    },
    isResizable: true,
  },
];
