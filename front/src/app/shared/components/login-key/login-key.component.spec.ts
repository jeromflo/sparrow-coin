import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginKeyComponent } from './login-key.component';

describe('LoginKeyComponent', () => {
  let component: LoginKeyComponent;
  let fixture: ComponentFixture<LoginKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
