import { PromiseLogic } from 'src/shared/logic/promise-logic/promise-logic';
import { DatabaseService } from '../../model-database/database/database.service';
import { Injectable } from '@nestjs/common';
import { ITrx } from 'src/interfaces/trx.interface';

@Injectable()
export class TransaccionORMService extends PromiseLogic {
  constructor(protected databaseService: DatabaseService) {
    super();
  }
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
  getByArraysIdNotMinning(ids: string[]): Promise<any[]> {
    let sql = `select * from ViewTransaccionesNotMinning vtm where vtm.id in (`;
    ids.forEach((id, index) => {
      sql += index < ids.length - 1 ? `'${id}',` : `'${id}')`;
    });
    console.log(sql);

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
}
