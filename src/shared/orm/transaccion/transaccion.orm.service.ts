import { DatabaseService } from '../../model-database/database/database.service';
import { Injectable } from '@nestjs/common';
import { ITrx } from 'src/interfaces/trx.interface';

@Injectable()
export class TransaccionORMService {
  constructor(private databaseService: DatabaseService) {}
  getAll(): Promise<ITrx[]> {
    const sql = 'select * from Transacciones';
    return new Promise<ITrx[]>((resolve, reject) => {
      this.databaseService.exectQuery(sql, (res, err) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  getById(id): Promise<ITrx> {
    const sql = `select * from Transacciones where id = ${id}`;
    return new Promise<ITrx>((resolve, reject) => {
      this.databaseService.exectQuery(sql, (res, err) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  getByAddressOrigin(address): Promise<ITrx> {
    const sql = `select * from Transacciones where addressOrigen like ${address}`;
    return new Promise<ITrx>((resolve, reject) => {
      this.databaseService.exectQuery(sql, (res, err) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  getByAddressDestino(address): Promise<ITrx> {
    const sql = `select * from Transacciones where addressDestino like ${address}`;
    return new Promise<ITrx>((resolve, reject) => {
      this.databaseService.exectQuery(sql, (res, err) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  insertTransacction(trx: ITrx) {
    const sql = `INSERT INTO Transacciones
    (id, cantidad, addressDestino, addressOrigen, caducidad,timestamp)
    VALUES(${trx.getId()}, ${trx.getCant()}, ${
      trx.getAddressDest().publickKey
    }, ${
      trx.getAddressOrigin().publickKey
    }, ${trx.getCaducidad()},${trx.getTimeStamp()});`;
    return new Promise<ITrx>((resolve, reject) => {
      this.databaseService.exectQuery(sql, (res, err) => {
        console.log(res);

        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  deleteTransacction(trx: ITrx) {
    const sql = `DELETE FROM Transacciones
    WHERE id='${trx.getId()}'`;

    return new Promise<ITrx>((resolve, reject) => {
      this.databaseService.exectQuery(sql, (res, err) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  updateTransacction(trx: ITrx) {
    const sql = `UPDATE Transacciones
    SET cantidad='${trx.getCant()}', addressDestino='${
      trx.getAddressDest().publickKey
    }', addressOrigen='${
      trx.getAddressOrigin().publickKey
    }', caducidad=${trx.getCaducidad()}, "timestamp"=${trx.getTimeStamp()}
    WHERE id='${trx.getId()}';
    `;

    return new Promise<ITrx>((resolve, reject) => {
      this.databaseService.exectQuery(sql, (res, err) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}
