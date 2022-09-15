import { DatabaseService } from './../../model-database/database/database.service';
import { Injectable } from '@nestjs/common';
import { Nodo } from 'src/model/node';

@Injectable()
export class NodeOrmService {
  constructor(private databaseService: DatabaseService) {}
  getAll(): Promise<any[]> {
    const sql = 'select * from Nodo';
    return this.promiseGet<any>(sql);
  }
  getById(id): Promise<any[]> {
    const sql = `select * from Nodo where id like '${id}'`;

    return this.promiseGet<any>(sql);
  }
  getByTimeStamp(timeLt, timeGt): Promise<any[]> {
    let sql = `select * from Nodo where `;
    timeGt ? (sql += `timeStamp > '${timeGt}'`) : '';
    timeLt ? (sql += `timeStamp < '${timeLt}'`) : '';
    return this.promiseGet<any>(sql);
  }

  getByMiner(address): Promise<any[]> {
    const sql = `select * from Nodo where minero like '${address}'`;

    return this.promiseGet<any>(sql);
  }
  insertNodo(nodo: Nodo, unionTransaccion: number) {
    const sql = `INSERT INTO Nodo
    (id, "timestamp", id_union_transaccion, minero)
    VALUES('${nodo.getIdHash()}', ${nodo.getTimeStamp()}, 0, '${nodo.getMiner()}');
   `;
    return this.promiseOthers<any>(sql);
  }
  deleteTransacction(nodo: Nodo) {
    const sql = `DELETE FROM Nodo
      WHERE id='${nodo.getIdHash()}'`;

    return this.promiseOthers<any>(sql);
  }
  updateNode(nodo: Nodo, unionTransaccion: number) {
    const sql = `UPDATE Nodo
    SET "timestamp"=${nodo.getTimeStamp()}, minero='${nodo.getMiner()}', id_union_transaccion='${unionTransaccion}'
    WHERE id='${nodo.getIdHash()}'; 
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
