import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { ComponentsModuleShared } from 'src/app/shared/components/components.module';
import { TablePrincipalComponent } from 'src/app/core/components/sections/principal/table-principal/table-principal.component';

@NgModule({
  declarations: [PrincipalComponent, TablePrincipalComponent],
  providers: [],
  imports: [CommonModule, PrincipalRoutingModule, ComponentsModuleShared],
})
export class PrincipalModule {}
