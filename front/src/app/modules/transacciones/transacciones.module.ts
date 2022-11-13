import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaccionesRoutingModule } from './transacciones-routing.module';
import { TransaccionesComponent } from './transacciones.component';
import { ComponentsModuleShared } from 'src/app/shared/components/components.module';
import { TableTransaccionesComponent } from 'src/app/core/components/sections/transacciones/table-transacciones/table-transacciones.component';
import { DatePipe } from 'src/app/shared/pipes/date/date.pipe';

@NgModule({
  declarations: [TransaccionesComponent, TableTransaccionesComponent, DatePipe],
  imports: [CommonModule, TransaccionesRoutingModule, ComponentsModuleShared],
})
export class TransaccionesModule {}
