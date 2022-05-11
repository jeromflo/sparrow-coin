import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrincipalGateway } from './principal.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrincipalGateway],
})
export class AppModule {}
