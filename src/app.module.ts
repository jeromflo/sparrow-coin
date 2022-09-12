import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrincipalGateway } from './principal.gateway';
import { CryptoService } from './shared/utils/crypto/crypto.service';
import { TrxService } from './shared/logic/trx/trx.service';
import { PilaTrxService } from './shared/logic/pila-trx/pila-trx.service';
import { AlmacenService } from './shared/logic/almacen/almacen.service';
import { DatabaseService } from './shared/model-database/database/database.service';
import { InitDatabaseService } from './shared/model-database/init-database/init-database.service';

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
    DatabaseService,
    InitDatabaseService,
  ],
})
export class AppModule {}
