import { Module } from '@nestjs/common';
import { ModelDatabaseModule } from '../model-database/model-database.module';
import { TransaccionORMService } from './transaccion/transaccion.orm.service';
import { NodeOrmService } from './node/node.orm.service';
import { UnionTransaccionService } from './union-transaccion/union-transaccion.service';

@Module({
  imports: [ModelDatabaseModule],
  providers: [TransaccionORMService, NodeOrmService, UnionTransaccionService],
  exports: [TransaccionORMService, NodeOrmService, UnionTransaccionService],
})
export class OrmModule {}
