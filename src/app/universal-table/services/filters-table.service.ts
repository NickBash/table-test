import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControllerEventsOptions } from '../../types/others';

@Injectable({
  providedIn: null,
})
export class FiltersTableService {
  filtersTable$ = new BehaviorSubject<Record<string, unknown>>({});

  partialUpdate<T>(patch: Partial<T>) {
    const current = this.filtersTable$.value;
    this.filtersTable$.next({ ...current, ...patch });
  }

  constructor() {}
}
