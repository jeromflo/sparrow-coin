import { TrxService } from './trx/trx.service';
import { PilaTrxService } from './pila-trx/pila-trx.service';
import { AlmacenService } from './almacen/almacen.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [TrxService, PilaTrxService, AlmacenService],
  exports: [TrxService, PilaTrxService, AlmacenService],
})
export class LogicModule {}
