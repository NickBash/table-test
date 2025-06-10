import { Pipe, PipeTransform } from '@angular/core';
import { CheckboxOptions } from '../../../../../constants/table-cv-header';

@Pipe({
  name: 'getCheckboxData',
  standalone: true,
})
export class GetCheckboxDataPipe implements PipeTransform {
  transform(value: unknown): CheckboxOptions[] {
    if (Array.isArray(value)) {
      return value;
    }

    return [];
  }
}
