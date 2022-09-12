import { Injectable } from '@nestjs/common';
import { Trx } from 'src/model/trx';

@Injectable()
export class PilaTrxService {
  private transacctions: Trx[] = [];

  getTransacctions(): Trx[] {
    return this.transacctions;
  }
  getTransacction(itrx: Trx): Trx {
    return this.transacctions.filter((el: Trx) => el.id === itrx.id)[0];
  }
  deleteTransacction(trx: Trx): boolean {
    const trxTemp = this.transacctions.filter((el: Trx) => el.id !== trx.id);
    if (trxTemp.length < this.transacctions.length) {
      this.transacctions = trxTemp;
      return true;
    } else {
      return false;
    }
  }
  cleanTransactions(): void {
    this.transacctions = [];
  }
  addTransacction(trx: Trx): void {
    this.transacctions.push(trx);
  }
}
