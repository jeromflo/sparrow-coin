import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { DaoService } from '../connection-mysql/dao.service';

@Injectable()
export class DatabaseService {
  private db: sqlite3.Database = this.dao.getIstanceDB();
  constructor(private dao: DaoService) {
    //= DaoService.createInstance()
  }
  onModuleDestroy() {
    this.closeConnection();
  }
  exectQuery(
    cadena: string,
    callback: (resolve?, reject?, ...arg) => void,
  ): void {
    this.db.serialize(() => {
      this.db.exec(cadena, callback);
    });
  }
  getExectQuery(
    cadena: string,
    callback: (reject?, resolve?, ...arg) => void,
  ): void {
    this.db.serialize(() => {
      this.db.all(cadena, callback);
    });
  }
  closeConnection() {
    this.db.close();
  }
  public getDB() {
    return this.db;
  }
}
