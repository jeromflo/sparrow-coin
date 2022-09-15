import { Trx } from './../../../model/trx';
import { UnionTransaccion } from './../../../model/union-transaccion';
import { PromiseLogic } from './../../logic/promise-logic/promise-logic';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/model-database/database/database.service';
import { Nodo } from 'src/model/node';
import { ITrx } from 'src/interfaces/trx.interface';

@Injectable()
export class UnionTransaccionService extends PromiseLogic {
  constructor(protected databaseService: DatabaseService) {
    super();
  }
  getAll(): Promise<any[]> {
    const sql = 'select * from Union_Transacciones';
    return this.promiseGet<any>(sql);
  }
  getById(id): Promise<any[]> {
    const sql = `select * from Union_Transacciones where id like '${id}'`;

    return this.promiseGet<any>(sql);
  }
  getByNodo(nodo: Nodo): Promise<any[]> {
    const sql = `select * from Union_Transacciones where id_nodo like '${nodo.getIdHash()}'`;
    console.log(sql);

    return this.promiseGet<any>(sql);
  }
  getByTransaccion(trx: ITrx): Promise<any[]> {
    const sql = `select * from Union_Transacciones where id_transaccion like '${trx.getId()}'`;

    return this.promiseGet<any>(sql);
  }
  insertUnionTransaccion(ut: UnionTransaccion) {
    let sql = '';
    ut.getTrx().forEach((trx) => {
      const sqlTemp = `INSERT INTO Union_Transacciones
        (id, id_transaccion, id_nodo)
        VALUES('${ut.getId()}', '${trx.getId()}', '${ut
        .getNodo()
        .getIdHash()}');
          `;
      sql += sqlTemp;
    });

    return this.promiseOthers<any>(sql);
  }
}
