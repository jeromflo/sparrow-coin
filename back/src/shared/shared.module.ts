import { OrmModule } from './orm/orm.module';
import { Module } from '@nestjs/common';
import { CommunicationModule } from './communication/communication.module';
import { ModelDatabaseModule } from './model-database/model-database.module';
import { UtilsModule } from './utils/utils.module';
import { LogicModule } from './logic/logic.module';

@Module({
  imports: [
    CommunicationModule,
    ModelDatabaseModule,
    UtilsModule,
    LogicModule,
    OrmModule,
  ],
  exports: [
    CommunicationModule,
    ModelDatabaseModule,
    UtilsModule,
    OrmModule,
    LogicModule,
  ],
  providers: [],
})
export class SharedModule {}
