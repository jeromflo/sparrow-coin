import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnknowPageRoutingModule } from './unknow-page-routing.module';
import { UnknowPageComponent } from './unknow-page.component';


@NgModule({
  declarations: [
    UnknowPageComponent
  ],
  imports: [
    CommonModule,
    UnknowPageRoutingModule
  ]
})
export class UnknowPageModule { }
