import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './login.reducer';
import { alertReducer } from './alerts.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('login', loginReducer),
    StoreModule.forFeature('alert', alertReducer),
  ],
})
export class ComunModule {}
