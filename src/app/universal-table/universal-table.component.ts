import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  PrizmInputTextModule,
  PrizmSelectInputComponent,
  PrizmSelectStringify,
  PrizmTableModule,
} from '@prizm-ui/components';
import { ColumnItem, SelectOptions } from '../constants/table-cv-header';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { FiltersTableService } from './services/filters-table.service';

@Component({
  selector: 'app-universal-table',
  standalone: true,
  imports: [
    PrizmTableModule,
    PrizmInputTextModule,
    PrizmSelectInputComponent,
    ReactiveFormsModule,
    FilterComponent,
  ],
  templateUrl: './universal-table.component.html',
  styleUrl: './universal-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FiltersTableService],
})
export class UniversalTableComponent<T> implements OnInit {
  columns = input<ColumnItem<T>[]>([]);
  rows = input<T[]>([]);
  a = new FormControl();

  selectRowId = signal<number | null>(null);
  changeFilters = output<Record<string, unknown>>();

  filtersTableService = inject(FiltersTableService);

  readonly stringify: PrizmSelectStringify<SelectOptions> = (
    item: SelectOptions,
  ) => {
    return item?.label;
  };

  selectRow<T extends { id: number }>(cell: T) {
    console.log(cell);
    this.selectRowId.set(cell.id);
  }

  ngOnInit(): void {
    this.filtersTableService.filtersTable$.subscribe((v) => {
      this.changeFilters.emit(v);
    });
  }
}
