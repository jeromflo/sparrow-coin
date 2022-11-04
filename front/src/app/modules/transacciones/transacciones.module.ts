import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaccionesRoutingModule } from './transacciones-routing.module';
import { TransaccionesComponent } from './transacciones.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TableTransaccionesComponent } from 'src/app/core/components/sections/transacciones/table-transacciones/table-transacciones.component';

@NgModule({
  declarations: [TransaccionesComponent, TableTransaccionesComponent],
  imports: [CommonModule, TransaccionesRoutingModule, ComponentsModule],
})
export class TransaccionesModule {}
