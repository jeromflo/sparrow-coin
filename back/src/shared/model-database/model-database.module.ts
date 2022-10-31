import { DaoService } from './connection-mysql/dao.service';
import { DatabaseService } from './database/database.service';
import { InitDatabaseService } from './init-database/init-database.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [DatabaseService, InitDatabaseService, DaoService],
  exports: [DatabaseService, InitDatabaseService, DaoService],
})
export class ModelDatabaseModule {}
