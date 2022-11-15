import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMineriaAutomaticaComponent } from './table-mineria-automatica.component';

describe('TableMineriaAutomaticaComponent', () => {
  let component: TableMineriaAutomaticaComponent;
  let fixture: ComponentFixture<TableMineriaAutomaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMineriaAutomaticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMineriaAutomaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
