import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineriaRoutingModule } from './mineria-routing.module';
import { MineriaComponent } from './mineria.component';
import { TransaccionesModule } from '../transacciones/transacciones.module';
import { MineriaAutomaticaComponent } from 'src/app/core/components/sections/mineria/mineria-automatica/mineria-automatica.component';
import { ComponentsModuleShared } from 'src/app/shared/components/components.module';
import { TableMineriaAutomaticaComponent } from 'src/app/core/components/sections/mineria/table-mineria-automatica/table-mineria-automatica.component';

@NgModule({
  declarations: [
    MineriaComponent,
    MineriaAutomaticaComponent,
    TableMineriaAutomaticaComponent,
  ],
  imports: [
    CommonModule,
    MineriaRoutingModule,
    TransaccionesModule,
    ComponentsModuleShared,
  ],
})
export class MineriaModule {}
