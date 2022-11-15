export interface ICreateNodo {
  miner: string;
  transactions: Trx[];
}

interface Trx {
  id: string;
}
