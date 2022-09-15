import { Module } from '@nestjs/common';
import { ModelDatabaseModule } from '../model-database/model-database.module';
import { TransaccionORMService } from './transaccion/transaccion.orm.service';
import { NodeOrmService } from './node/node.orm.service';

@Module({
  imports: [ModelDatabaseModule],
  providers: [TransaccionORMService, NodeOrmService],
  exports: [TransaccionORMService],
})
export class OrmModule {}
