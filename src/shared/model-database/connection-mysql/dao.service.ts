// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
@Injectable()
export class DaoService {
  private instanceDb: sqlite3.Database;
  constructor() {
    this.createInstance();
  }
  createInstance() {
    if (!this.instanceDb) {
      try {
        this.instanceDb = new sqlite3.Database(
          'src/shared/model-database/connection-mysql/sql.desa.db',
        );
      } catch (exception) {
        console.log('Excepcion encontrada al setear la database', exception);
      }
    }
  }
  public getIstanceDB(): sqlite3.Database {
    return this.instanceDb;
  }
}
