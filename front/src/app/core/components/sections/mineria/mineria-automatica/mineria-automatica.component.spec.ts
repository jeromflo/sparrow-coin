import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineriaAutomaticaComponent } from './mineria-automatica.component';

describe('MineriaAutomaticaComponent', () => {
  let component: MineriaAutomaticaComponent;
  let fixture: ComponentFixture<MineriaAutomaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineriaAutomaticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MineriaAutomaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
