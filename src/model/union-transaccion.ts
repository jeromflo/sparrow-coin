import { Nodo } from 'src/model/node';
import { Trx } from './trx';
import sha256 = require('crypto-js/sha256');

export class UnionTransaccion {
  private id: string;
  private trx: Trx[];
  private nodo: Nodo;

  constructor(trx: Trx[], nodo: Nodo) {
    this.nodo = nodo;
    this.trx = trx;
    this.id = sha256(this.toStringDeep()).toString();
  }
  public getId(): string {
    return this.id;
  }

  public getTrx(): Trx[] {
    return this.trx;
  }

  public getNodo(): Nodo {
    return this.nodo;
  }

  toStringDeep() {
    return JSON.stringify(this);
  }
  toString(): string {
    return `${this.id} `;
  }
}
