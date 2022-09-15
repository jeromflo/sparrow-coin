import { DatabaseService } from '../../model-database/database/database.service';
import { Injectable } from '@nestjs/common';
import { ITrx } from 'src/interfaces/trx.interface';

@Injectable()
export class TransaccionORMService {
  constructor(private databaseService: DatabaseService) {}
  getAll(): Promise<any[]> {
    const sql = 'select * from Transacciones';
    return this.promiseGet<any>(sql);
  }
  getById(id): Promise<any[]> {
    const sql = `select * from Transacciones where id like '${id}'`;

    return this.promiseGet<any>(sql);
  }
  getByAddressOrigin(address): Promise<any[]> {
    const sql = `select * from Transacciones where addressOrigen like '${address}'`;
    console.log(sql);

    return this.promiseGet<any>(sql);
  }
  getByAddressDestino(address): Promise<any[]> {
    const sql = `select * from Transacciones where addressDestino like '${address}'`;

    return this.promiseGet<any>(sql);
  }
  insertTransacction(trx: ITrx) {
    const sql = `INSERT INTO Transacciones
    (id, cantidad, addressDestino, addressOrigen, caducidad,timestamp)
    VALUES('${trx.getId()}', ${trx.getCant()}, '${trx
      .getAddressDest()
      .getPublickKey()}', '${trx
      .getAddressOrigin()
      .getPublickKey()}', ${trx.getCaducidad()},${trx.getTimeStamp()});`;
    return this.promiseOthers<any>(sql);
  }
  deleteTransacction(trx: ITrx) {
    const sql = `DELETE FROM Transacciones
    WHERE id='${trx.getId()}'`;

    return this.promiseOthers<any>(sql);
  }
  updateTransacction(trx: ITrx) {
    const sql = `UPDATE Transacciones
    SET cantidad='${trx.getCant()}', addressDestino='${trx
      .getAddressDest()
      .getPublickKey()}', addressOrigen='${trx
      .getAddressOrigin()
      .getPublickKey()}', caducidad=${trx.getCaducidad()}, "timestamp"=${trx.getTimeStamp()}
    WHERE id='${trx.getId()}';
    `;

    return this.promiseOthers<any>(sql);
  }
  promiseGet<T>(sql) {
    return new Promise<T>((resolve, reject) => {
      this.databaseService.getExectQuery(sql, (err, res, ...arg) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  promiseOthers<T>(sql) {
    return new Promise<T>((resolve, reject) => {
      this.databaseService.exectQuery(sql, (err, res, ...arg) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}
