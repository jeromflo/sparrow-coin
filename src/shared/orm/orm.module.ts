import { Module } from '@nestjs/common';
import { ModelDatabaseModule } from '../model-database/model-database.module';
import { TransaccionORMService } from './transaccion/transaccion.orm.service';

@Module({
  imports: [ModelDatabaseModule],
  providers: [TransaccionORMService],
  exports: [TransaccionORMService],
})
export class OrmModule {}
