import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTransaccionesComponent } from './table-transacciones.component';

describe('TableTransaccionesComponent', () => {
  let component: TableTransaccionesComponent;
  let fixture: ComponentFixture<TableTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTransaccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
