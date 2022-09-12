import { Nodo } from './../../../model/node';
import { Trx } from './../../../Model/trx';
import { PilaTrxService } from './../pila-trx/pila-trx.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlmacenService {
  private chain: Nodo[];

  constructor(private pilaTrx: PilaTrxService) {}
  public getChain(): Nodo[] {
    return this.chain;
  }

  public setChain(chain: Nodo[]): void {
    this.chain = chain;
  }
  public sincronizaChain(): void {}
  comprobarTransaccion(trx: Trx, node: Nodo): boolean | Trx {
    const nodo: Nodo = this.chain.filter(
      (el) => el.getIdHash() === node.getIdHash(),
    )[0];
    if (!nodo) {
      return false;
    }
    const hasTrx = nodo.getTransaccion(trx);
    if (!hasTrx) {
      return false;
    }
    return hasTrx;
  }
  verifyTrx(trx: Trx, node: Nodo) {
    const nodo: Nodo = this.chain.filter(
      (el) => el.getIdHash() === node.getIdHash(),
    )[0];
    nodo.getMerkleTree().verificaLeaf(trx.toStringDeep());
  }
}
