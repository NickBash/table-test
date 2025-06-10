import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  Input,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PrizmInputCommonModule,
  PrizmInputIconButtonComponent,
  PrizmInputTextComponent,
} from '@prizm-ui/components';

@Component({
  selector: 'app-filter-search',
  standalone: true,
  imports: [
    PrizmInputCommonModule,
    PrizmInputIconButtonComponent,
    PrizmInputTextComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSearchComponent {
  searchControl = new FormControl<string | null>(null);

  searchTerm = input<string>('');

  constructor() {
    effect(() => {
      const value = this.searchTerm();

      this.searchControl.setValue(value);
    });
  }

  get value(): string {
    return this.searchControl.value ?? '';
  }

  clean() {
    this.searchControl.setValue('');
  }
}
