import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSwapComponent } from './date-swap.component';

describe('DateSwapComponent', () => {
  let component: DateSwapComponent;
  let fixture: ComponentFixture<DateSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateSwapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
