import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDateTimeRangeComponent } from './filter-date-time-range.component';

describe('FilterDateTimeRangeComponent', () => {
  let component: FilterDateTimeRangeComponent;
  let fixture: ComponentFixture<FilterDateTimeRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterDateTimeRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterDateTimeRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
