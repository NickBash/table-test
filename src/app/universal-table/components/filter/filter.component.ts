import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FilterOptions } from '../../../constants/table-cv-header';
import {
  PrizmButtonComponent,
  PrizmDataListComponent,
  PrizmDropdownHostComponent,
} from '@prizm-ui/components';
import { TableColumnFilterType } from '../../../enums/table-column-filter-type';
import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { FiltersTableService } from '../../services/filters-table.service';
import { GetSearchDataPipe } from './components/pipes/get-search-data.pipe';
import { FilterCheckBoxComponent } from './components/filter-check-box/filter-check-box.component';
import { GetCheckboxDataPipe } from './components/pipes/get-checkbox-data.pipe';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    PrizmDropdownHostComponent,
    PrizmDataListComponent,
    PrizmButtonComponent,
    FilterSearchComponent,
    GetSearchDataPipe,
    FilterCheckBoxComponent,
    GetCheckboxDataPipe,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  filterOptions = input<FilterOptions>();

  @Input()
  columnKey: string = '';

  currentValue = signal<unknown>(null);

  readonly tableColumnFilterTypeEnum = TableColumnFilterType;
  readonly isOpenFilter = signal(false);

  private readonly filterSearch =
    viewChild<FilterSearchComponent>('filterSearch');
  private readonly filterCheckbox =
    viewChild<FilterCheckBoxComponent>('filterCheckbox');

  private readonly filtersTableService = inject(FiltersTableService);

  constructor() {
    effect(() => {
      console.log(this.filterOptions());
    });
  }

  ngOnInit(): void {}

  openFilter() {
    const filtersValue = this.filtersTableService.filtersTable$.getValue();

    if (Object.prototype.hasOwnProperty.call(filtersValue, this.columnKey)) {
      this.currentValue.set(filtersValue[this.columnKey]);
    }

    this.isOpenFilter.set(true);
  }

  applyFilter(): void {
    if (
      this.filterOptions()?.filterType === TableColumnFilterType.SearchFilter
    ) {
      const value = this.filterSearch()?.value;

      this.filtersTableService.partialUpdate({ [this.columnKey]: value });
    }
    if (
      this.filterOptions()?.filterType === TableColumnFilterType.CheckboxFilter
    ) {
      const value = this.filterCheckbox()?.value;

      this.filtersTableService.partialUpdate({ [this.columnKey]: value });
    }
  }

  resetFilter(): void {
    this.filtersTableService.partialUpdate({ [this.columnKey]: null });
    this.currentValue.set(null);
  }
}
