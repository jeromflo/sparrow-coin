import { Miner } from './miner';
import { MerkleTreeImpl } from './merkleTree';
import { Trx } from './trx';
export class Nodo {
  private miner: Miner;
  private timeStamp: number;
  private idHash: string;
  private transacciones: Trx[];
  private merkleTree: MerkleTreeImpl;
  constructor(
    miner: Miner,
    idHash: string,
    transacciones: Trx[],
    merkleTree: MerkleTreeImpl,
  ) {
    this.timeStamp = new Date().getTime();
    this.miner = miner;
    this.idHash = idHash;
    this.transacciones = transacciones;
    this.merkleTree = merkleTree;
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
    return this.transacciones.filter((el) => trx.id === el.id)[0];
  }

  public getMerkleTree(): MerkleTreeImpl {
    return this.merkleTree;
  }

  public setMerkleTree(merkleTree: MerkleTreeImpl): void {
    this.merkleTree = merkleTree;
  }
}
