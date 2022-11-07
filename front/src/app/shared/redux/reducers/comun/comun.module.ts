import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './login.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('login', loginReducer)],
})
export class ComunModule {}
