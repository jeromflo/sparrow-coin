import { DatabaseService } from './../../model-database/database/database.service';
import { Injectable } from '@nestjs/common';
import { Nodo } from 'src/model/node';
import { PromiseLogic } from 'src/shared/logic/promise-logic/promise-logic';

@Injectable()
export class NodeOrmService extends PromiseLogic {
  constructor(protected databaseService: DatabaseService) {
    super();
  }
  getAll(): Promise<any[]> {
    const sql = 'select * from Nodo';
    return this.promiseGet<any>(sql);
  }
  getById(id): Promise<any[]> {
    const sql = `select * from Nodo where id like '${id}'`;

    return this.promiseGet<any>(sql);
  }
  getByMiner(id): Promise<any[]> {
    const sql = `select * from ViewNodeTransactions vnt  where minero like '${id}'`;

    return this.promiseGet<any>(sql);
  }
  getLastNode() {
    const sql = `select * from Nodo n order by "timestamp" DESC limit 1;`;
    console.log(sql);

    return this.promiseGet<any>(sql);
  }
  getByTimeStamp(timeLt, timeGt): Promise<any[]> {
    let sql = `select * from Nodo where `;
    timeGt ? (sql += `timeStamp > '${timeGt}'`) : '';
    timeLt ? (sql += `timeStamp < '${timeLt}'`) : '';
    return this.promiseGet<any>(sql);
  }
  getMergeDataByNode(idNodo: string) {
    const sql = `select * from ViewNodeTransactions where id_nodo like '${idNodo}'`;

    return this.promiseGet<any>(sql);
  }
  getAllMergeData() {
    const sql = `select * from ViewNodeTransactions `;

    return this.promiseGet<any>(sql);
  }

  insertNodo(nodo: Nodo, unionTransaccion: string) {
    const sql = `INSERT INTO Nodo
    (id, "timestamp", id_union_transaccion, minero)
    VALUES('${nodo.getIdHash()}', ${nodo.getTimeStamp()}, '${unionTransaccion}', '${nodo
      .getMiner()
      .getId()}');
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
}
