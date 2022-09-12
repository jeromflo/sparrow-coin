import { Injectable } from '@nestjs/common';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

@Injectable()
export class ConnectionMysqlService {
  private static instanceDb: any;
  private constructor() {
    console.log(2);
  }
  static async createInstance(): Promise<sqlite3.Database> {
    if (!this.instanceDb) {
      this.instanceDb = await open({
        filename: './../../../../database/sql.db',
        driver: sqlite3.Database,
      });
    }
    return this.instanceDb;
  }
}
