import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTransaccionsRoutingModule } from './create-transaccions-routing.module';
import { CreateTransaccionsComponent } from './create-transaccions.component';


@NgModule({
  declarations: [
    CreateTransaccionsComponent
  ],
  imports: [
    CommonModule,
    CreateTransaccionsRoutingModule
  ]
})
export class CreateTransaccionsModule { }
