import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';

@NgModule({
  declarations: [PrincipalComponent],
  providers: [SocketClientService],
  imports: [CommonModule, PrincipalRoutingModule, ComponentsModule],
})
export class PrincipalModule {}
