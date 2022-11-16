import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTableComponent } from './empty-table.component';

describe('EmptyTableComponent', () => {
  let component: EmptyTableComponent;
  let fixture: ComponentFixture<EmptyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
