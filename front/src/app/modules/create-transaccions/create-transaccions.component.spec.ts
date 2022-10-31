import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransaccionsComponent } from './create-transaccions.component';

describe('CreateTransaccionsComponent', () => {
  let component: CreateTransaccionsComponent;
  let fixture: ComponentFixture<CreateTransaccionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTransaccionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTransaccionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
