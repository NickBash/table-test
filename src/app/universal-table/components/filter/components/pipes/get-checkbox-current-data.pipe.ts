import { Pipe, PipeTransform } from '@angular/core';
import { CheckboxOptions } from '../../../../../constants/table-cv-header';

@Pipe({
  name: 'getCheckboxCurrentData',
  standalone: true,
})
export class GetCheckboxCurrentDataPipe implements PipeTransform {
  transform(value: unknown): string[] {
    if (Array.isArray(value)) {
      return value;
    }

    return [];
  }
}
