import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class InitDatabaseService {
  constructor(private databaseService: DatabaseService) {}
  public initDatabase() {
    this.createTable();
  }
  private createTable() {
    this.createTableAddres();
    this.createTableNode();
    this.createTableTransacciones();
    this.createTableUnionTransacciones();
    this.createViewNodeTransactions();
    this.createViewTransaccionesMinning();
    this.createViewTransaccionesNotMinning();
  }
  private createTableAddres() {
    this.databaseService.exectQuery(
      `CREATE TABLE Address (
          id TEXT(256) NOT NULL,
          CONSTRAINT Address_PK PRIMARY KEY (id)
      );`,
      (error) => {
        this.errorCreacionTablas('Address con Error: ' + error);
      },
    );
  }
  private createTableNode() {
    this.databaseService.exectQuery(
      `-- Nodo definition

      CREATE TABLE Nodo (
        id TEXT(256) NOT NULL,
        "timestamp" INTEGER,
        minero TEXT(256) NOT NULL,
        id_union_transaccion TEXT(256) NOT NULL,
        CONSTRAINT Nodo_PK PRIMARY KEY (id),
        CONSTRAINT Nodo_FK FOREIGN KEY (id_union_transaccion) REFERENCES Union_Transacciones(id),
        CONSTRAINT Nodo_FK_1 FOREIGN KEY (minero) REFERENCES Address(id)
      );
      `,
      (error) => {
        this.errorCreacionTablas('Nodo con Error: ' + error);
      },
    );
  }
  private createTableTransacciones() {
    this.databaseService.exectQuery(
      `-- Transacciones definition

      CREATE TABLE Transacciones (
        id TEXT(256) NOT NULL,
        cantidad INTEGER,
        addressDestino TEXT(256) NOT NULL,
        addressOrigen TEXT(256) NOT NULL,
        caducidad NUMERIC NOT NULL, "timestamp" INTEGER NOT NULL,
        CONSTRAINT Transacciones_PK PRIMARY KEY (id),
        CONSTRAINT Transacciones_FK FOREIGN KEY (addressDestino) REFERENCES Address(id),
        CONSTRAINT Transacciones_FK_1 FOREIGN KEY (addressOrigen) REFERENCES Address(id)
      );
      
      CREATE INDEX Transacciones_id_IDX ON Transacciones (id);
      `,
      (error) => {
        this.errorCreacionTablas('Transacciones con Error: ' + error);
      },
    );
  }
  private createTableUnionTransacciones() {
    this.databaseService.exectQuery(
      `-- Union_Transacciones definition

      CREATE TABLE Union_Transacciones (
        id TEXT(256) NOT NULL,
        id_transaccion TEXT(256) NOT NULL,
        id_nodo TEXT(256) NOT NULL,
        CONSTRAINT Union_Transacciones_PK PRIMARY KEY (id_transaccion),
        CONSTRAINT Union_Transacciones_FK FOREIGN KEY (id_nodo) REFERENCES Nodo(id),
        CONSTRAINT Union_Transacciones_FK_1 FOREIGN KEY (id_transaccion) REFERENCES Transacciones(id)
      );
      `,
      (error) => {
        this.errorCreacionTablas('Union_Transacciones con Error: ' + error);
      },
    );
  }
  private createViewNodeTransactions() {
    this.databaseService.exectQuery(
      `-- viewNodeTransactions source

      CREATE VIEW ViewNodeTransactions AS select
      n.id  as id_nodo, n."timestamp" as "timestamp_node", n.minero , n.id_union_transaccion as id_union_transaccion_node,
      t.id  as transaction_id,t.cantidad transaction_cantidad, t.addressDestino, t.caducidad, t."timestamp" as transaction_timestamp
      from Nodo n join Union_Transacciones ut on ut.id_nodo =n.id  join Transacciones t on t.id =ut.id_transaccion ;
      `,
      (error) => {
        this.errorCreacionTablas('Union_Transacciones con Error: ' + error);
      },
    );
  }
  private createViewTransaccionesNotMinning() {
    this.databaseService.exectQuery(
      `CREATE VIEW ViewTransaccionesNotMinning AS 
      select t3.* 
      from (
      select
      DISTINCT ut.id_transaccion , 
      *
        from
        Transacciones t
      left join Union_Transacciones ut 
      on t.id =ut.id_transaccion  
      where ut.id_transaccion is NULL 
      ) t2 join Transacciones t3 where t2.id =t3.id;
      `,
      (error) => {
        this.errorCreacionTablas('Union_Transacciones con Error: ' + error);
      },
    );
  }
  private createViewTransaccionesMinning() {
    this.databaseService.exectQuery(
      `-- ViewTransaccionesMinning source

      CREATE VIEW ViewTransaccionesMinning
      AS 
      select t3.* 
      from (
      select
      DISTINCT ut.id_transaccion , 
      *
        from
        Transacciones t
      left join Union_Transacciones ut 
      on t.id =ut.id_transaccion  
      where not ut.id_transaccion is NULL 
      ) t2 join Transacciones t3 where t2.id =t3.id;
      `,
      (error) => {
        this.errorCreacionTablas('Union_Transacciones con Error: ' + error);
      },
    );
  }
  errorCreacionTablas(tabla: string) {
    console.log(`Error al crear la tabla ${tabla}\n`);
  }
}
