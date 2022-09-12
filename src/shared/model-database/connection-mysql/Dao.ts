// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as sqlite3 from 'sqlite3';

export class Dao {
  private static dao: Dao = null;
  private static instanceDb: sqlite3.Database;
  private constructor() {
    console.log(2);
  }
  static createInstance(): Dao {
    if (!this.dao) {
      this.dao = new Dao();
    }
    if (!this.instanceDb) {
      try {
        this.instanceDb = new sqlite3.Database('./sql.db');
      } catch (exception) {
        console.log('Excepcion encontrada al setear la database', exception);
      }
    }
    return this.dao;
  }
  public getIstanceDB(): sqlite3.Database {
    return Dao.instanceDb;
  }
}
