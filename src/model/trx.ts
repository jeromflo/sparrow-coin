import { Address } from './address';
export class Trx {
  constructor(
    id: string,
    cant: number,
    addressDest: Address,
    addressOrigin: Address,
    caducida: number,
  ) {
    this.id = id;
    this.cant = cant;
    this.addressDest = addressDest;
    this.addressOrigin = addressOrigin;
    this.caducidad = caducida;
    this.timeStamp = new Date().getTime();
  }
  public get id(): string {
    return this.id;
  }

  public set id(id: string) {
    this.id = id;
  }

  public get cant(): number {
    return this.cant;
  }

  public set cant(cant: number) {
    this.cant = cant;
  }

  public get addressDest(): Address {
    return this.addressDest;
  }

  public set addressDest(addressDest: Address) {
    this.addressDest = addressDest;
  }

  public get addressOrigin(): Address {
    return this.addressOrigin;
  }

  public set addressOrigin(addressOrigin: Address) {
    this.addressOrigin = addressOrigin;
  }

  public get timeStamp(): number {
    return this.timeStamp;
  }

  public set timeStamp(timeStamp: number) {
    this.timeStamp = timeStamp;
  }

  public get caducidad(): number {
    return this.caducidad;
  }

  public set caducidad(caducidad: number) {
    this.caducidad = caducidad;
  }

  toStringDeep() {
    return JSON.stringify(this);
  }
  toString() {
    return `{id:${this.id},cant:${this.cant},\n addressDest:${this.addressDest},\n addressOrigin:${this.addressOrigin}\n,caducidad:${this.caducidad}}`;
  }
}
