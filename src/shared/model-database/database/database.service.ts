import { Injectable } from '@nestjs/common';
import { DaoService } from '../connection-mysql/dao.service';

@Injectable()
export class DatabaseService {
  private db = this.dao.getIstanceDB();
  constructor(private dao: DaoService) {
    //= DaoService.createInstance()
  }

  exectQuery(
    cadena: string,
    callback: (resolve?, reject?, ...arg) => void,
  ): void {
    console.log(this.db);

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
