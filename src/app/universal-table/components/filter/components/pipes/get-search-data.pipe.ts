import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSearchData',
  standalone: true,
})
export class GetSearchDataPipe implements PipeTransform {
  transform(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }

    return '';
  }
}
