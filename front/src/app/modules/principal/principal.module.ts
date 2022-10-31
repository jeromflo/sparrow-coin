import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [PrincipalComponent],
  imports: [CommonModule, PrincipalRoutingModule, ComponentsModule],
})
export class PrincipalModule {}
