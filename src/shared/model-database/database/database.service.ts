import { Dao } from './../connection-mysql/Dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private db = this.dao.getIstanceDB();
  constructor(private dao: Dao = Dao.createInstance()) {}

  exectQuery(
    cadena: string,
    callback: (resolve?, reject?, ...arg) => void,
  ): void {
    this.db.serialize(() => {
      this.db.run(cadena, callback);
    });
    this.closeConnection();
  }
  closeConnection() {
    this.db.close();
  }
  public getDB() {
    return this.db;
  }
}
