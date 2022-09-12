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
      `CREATE TABLE Nodo (
          id TEXT(256) NOT NULL,
          "timestamp" INTEGER,
          id_union_transaccion INTEGER NOT NULL,
          minero TEXT(256) NOT NULL,
          CONSTRAINT Nodo_PK PRIMARY KEY (id),
          CONSTRAINT Nodo_FK FOREIGN KEY (minero) REFERENCES Address(id)
      );
      CREATE INDEX Nodo_id_IDX ON Nodo (id);
      
      `,
      (error) => {
        this.errorCreacionTablas('Nodo con Error: ' + error);
      },
    );
  }
  private createTableTransacciones() {
    this.databaseService.exectQuery(
      `CREATE TABLE Transacciones (
          id TEXT(256) NOT NULL,
          cantidad INTEGER,
          addressDestino TEXT(256) NOT NULL,
          addressOrigen TEXT(256) NOT NULL,
          caducidad NUMERIC NOT NULL,
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
      `CREATE TABLE Union_Transacciones (
          id TEXT(256) NOT NULL,
          id_transaccion TEXT(256) NOT NULL,
          id_nodo TEXT(256) NOT NULL,
          CONSTRAINT Union_Transacciones_PK PRIMARY KEY (id),
          CONSTRAINT Union_Transacciones_FK FOREIGN KEY (id_nodo) REFERENCES Nodo(id),
          CONSTRAINT Union_Transacciones_FK_1 FOREIGN KEY (id_transaccion) REFERENCES Transacciones(id)
      );
      CREATE INDEX Union_Transacciones_id_IDX ON Union_Transacciones (id,id_transaccion,id_nodo);
      
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
