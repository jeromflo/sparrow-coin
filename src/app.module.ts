import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrincipalGateway } from './principal.gateway';
import { CryptoService } from './shared/utils/crypto/crypto.service';
import { TrxService } from './shared/logic/trx/trx.service';
import { PilaTrxService } from './shared/logic/pila-trx/pila-trx.service';
import { AlmacenService } from './shared/logic/almacen/almacen.service';
import { ConnectionMysqlService } from './shared/model-database/connection-mysql/connection-mysql.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrincipalGateway,
    CryptoService,
    TrxService,
    PilaTrxService,
    AlmacenService,
    ConnectionMysqlService,
  ],
})
export class AppModule {}
