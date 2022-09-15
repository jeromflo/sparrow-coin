import { Miner } from './miner';
import { MerkleTreeImpl } from './merkleTree';
import { Trx } from './trx';
import sha256 = require('crypto-js/sha256');

export class Nodo {
  private miner: Miner;
  private timeStamp: number;
  private idHash: string;
  private transacciones: Trx[];
  private merkleTree: MerkleTreeImpl;
  constructor(miner: Miner, transacciones: Trx[], merkleTree: MerkleTreeImpl) {
    this.timeStamp = new Date().getTime();
    this.miner = miner;

    this.transacciones = transacciones;
    this.merkleTree = merkleTree;
    this.idHash = sha256(this.toStringDeep()).toString();
  }
  public getMiner(): Miner {
    return this.miner;
  }

  public setMiner(miner: Miner): void {
    this.miner = miner;
  }

  public getTimeStamp(): number {
    return this.timeStamp;
  }

  public setTimeStamp(timeStamp: number): void {
    this.timeStamp = timeStamp;
  }

  public getIdHash(): string {
    return this.idHash;
  }

  public setIdHash(idHash: string): void {
    this.idHash = idHash;
  }

  public getTransacciones(): Trx[] {
    return this.transacciones;
  }
  public getTransaccion(trx: Trx): Trx {
    return this.transacciones.filter((el) => trx.getId() === el.getId())[0];
  }

  public getMerkleTree(): MerkleTreeImpl {
    return this.merkleTree;
  }

  public setMerkleTree(merkleTree: MerkleTreeImpl): void {
    this.merkleTree = merkleTree;
  }
  toStringDeep() {
    return JSON.stringify(this);
  }
}
