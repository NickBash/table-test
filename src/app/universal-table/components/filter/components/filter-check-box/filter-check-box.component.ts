import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import { CheckboxOptions } from '../../../../../constants/table-cv-header';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrizmCheckboxComponent } from '@prizm-ui/components';

@Component({
  selector: 'app-filter-check-box',
  standalone: true,
  imports: [ReactiveFormsModule, PrizmCheckboxComponent],
  templateUrl: './filter-check-box.component.html',
  styleUrl: './filter-check-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterCheckBoxComponent {
  checkboxItems = input<CheckboxOptions[]>([]);
  currentValue = input<string[]>([]);

  formGroup!: FormGroup;
  isReadyForm = signal(false);

  constructor() {
    effect(() => {
      const checkboxItems = this.checkboxItems();
      const currentValue = this.currentValue();

      untracked(() => {
        if (!this.formGroup) {
          this.createForm(checkboxItems);
        }
        if (this.formGroup) {
          this.setValuesForm(currentValue);
        }
      });
    });
  }

  get value(): string[] {
    const formValues = this.formGroup.value;

    return Object.keys(formValues).filter((key) => formValues[key]);
  }

  clean() {
    this.formGroup.reset();
  }

  private setValuesForm(currentValue: string[] | null) {
    if (currentValue === null || !currentValue.length) {
      this.formGroup.reset();
      return;
    }

    const result = currentValue.reduce<Record<string, boolean>>((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});

    this.formGroup.patchValue(result);
  }

  private createForm(checkboxItems: CheckboxOptions[]): void {
    this.formGroup = new FormGroup({});

    checkboxItems.forEach((checkboxItem) => {
      this.formGroup.addControl(checkboxItem.value, new FormControl(false));
    });

    this.isReadyForm.set(true);
  }

  // Это больше не нужно, загляни в scss
  // isCheckboxSelected(controlName: string): boolean {
  //   const checkboxSelected = this.formGroup.get(controlName);
  //   return checkboxSelected ? checkboxSelected.value : false;
  // }
}
