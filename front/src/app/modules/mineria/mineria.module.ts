import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineriaRoutingModule } from './mineria-routing.module';
import { MineriaComponent } from './mineria.component';


@NgModule({
  declarations: [
    MineriaComponent
  ],
  imports: [
    CommonModule,
    MineriaRoutingModule
  ]
})
export class MineriaModule { }
