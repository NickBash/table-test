import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  Input,
} from '@angular/core';
import { CheckboxOptions } from '../../../../../constants/table-cv-header';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor } from '@angular/common';
import { PrizmCheckboxComponent } from '@prizm-ui/components';

@Component({
  selector: 'app-filter-check-box',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, PrizmCheckboxComponent],
  templateUrl: './filter-check-box.component.html',
  styleUrl: './filter-check-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterCheckBoxComponent {
  // @Input()
  // set checkboxItems(value: CheckboxOptions[]) {
  //   console.log(value);
  //   this.checkboxData = value;
  //   this.updateFormControls();
  // }
  checkboxItems = input<CheckboxOptions[]>([]);

  currentValue = input<CheckboxOptions[]>([]);

  get value(): CheckboxOptions[] {
    const formValues = this.formGroup.value;
    return this.checkboxData.map((item) => {
      return {
        ...item,
        byDefault: formValues[item.value],
      };
    });
  }

  formGroup!: FormGroup;
  checkboxData: CheckboxOptions[] = [];

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({});

    effect(() => {
      console.log(this.checkboxItems());
      console.log(this.currentValue());
    });
  }

  private updateFormControls(): void {
    // Очищаем текущие контролы
    Object.keys(this.formGroup.controls).forEach((controlName) => {
      this.formGroup.removeControl(controlName);
    });

    // Добавляем новые контролы
    this.checkboxData.forEach((checkboxItem) => {
      this.formGroup.addControl(
        checkboxItem.value,
        new FormControl(checkboxItem.byDefault ?? false),
      );
    });
  }

  isCheckboxSelected(controlName: string): boolean {
    const checkboxSelected = this.formGroup.get(controlName);
    return checkboxSelected ? checkboxSelected.value : false;
  }
}
