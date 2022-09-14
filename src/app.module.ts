import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrincipalGateway } from './principal.gateway';
import { SharedModule } from './shared/shared.module';
import { GatewaysModule } from './gateways/gateways.module';

@Module({
  imports: [SharedModule, GatewaysModule],
  controllers: [AppController],
  providers: [AppService, PrincipalGateway],
})
export class AppModule {}
