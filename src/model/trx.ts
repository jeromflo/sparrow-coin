import { ITrx } from 'src/interfaces/trx.interface';
import { IAddress } from './../interfaces/address.interface';
import { Address } from './address';
import sha256 from 'crypto-js/sha256';

export class Trx implements ITrx {
  private id: string;
  private cant: number;
  private addressDest: IAddress;
  private addressOrigin: IAddress;
  private caducidad: number;
  private timeStamp: number;
  constructor(
    cant: number,
    addressDest: IAddress,
    addressOrigin: IAddress,
    caducida: number,
  ) {
    this.cant = cant;
    this.addressDest = addressDest;
    this.addressOrigin = addressOrigin;
    this.caducidad = caducida;
    this.timeStamp = new Date().getTime();
    console.log(this);

    /*     this.id = sha256(JSON.stringify(this)).toString();
     */
  }
  public getId(): string {
    return this.id;
  }

  private setId(id: string) {
    this.id = id;
  }

  public getCant(): number {
    return this.cant;
  }

  public setCant(cant: number) {
    this.cant = cant;
  }

  public getAddressDest(): Address {
    return this.addressDest;
  }

  public setAddressDest(addressDest: Address) {
    this.addressDest = addressDest;
  }

  public getAddressOrigin(): Address {
    return this.addressOrigin;
  }

  public setAddressOrigin(addressOrigin: Address) {
    this.addressOrigin = addressOrigin;
  }

  public getTimeStamp(): number {
    return this.timeStamp;
  }

  private setTimeStamp(timeStamp: number) {
    this.timeStamp = timeStamp;
  }

  public getCaducidad(): number {
    return this.caducidad;
  }

  public setCaducidad(caducidad: number) {
    this.caducidad = caducidad;
  }
  /**
   *
   * @returns true si es valido, false si se ha pasado el tiempo
   */
  isTimeValid() {
    return this.timeStamp + this.caducidad > new Date().getTime();
  }

  toStringDeep() {
    return JSON.stringify(this);
  }
  toString() {
    return `{id:${this.id},cant:${this.cant},\n addressDest:${this.addressDest},\n addressOrigin:${this.addressOrigin}\n,caducidad:${this.caducidad}}`;
  }
}
