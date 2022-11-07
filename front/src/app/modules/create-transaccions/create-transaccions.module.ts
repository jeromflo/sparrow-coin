import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTransaccionsRoutingModule } from './create-transaccions-routing.module';
import { CreateTransaccionsComponent } from './create-transaccions.component';
import { CrearTransaccionComponent } from 'src/app/core/components/sections/transacciones/crear-transaccion/crear-transaccion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [CreateTransaccionsComponent, CrearTransaccionComponent],
  imports: [
    CommonModule,
    CreateTransaccionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CreateTransaccionsModule {}
