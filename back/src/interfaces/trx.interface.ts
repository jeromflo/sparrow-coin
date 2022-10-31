import { Address } from './../model/address';
import { IAddress } from './address.interface';

export interface ITrx {
  getId(): string;
  getCant(): number;
  setCant(cant: number);
  getAddressDest(): Address;
  setAddressDest(addressDest: Address);
  getAddressOrigin(): Address;
  setAddressOrigin(addressOrigin: Address);
  getTimeStamp(): number;
  getCaducidad(): number;
  setCaducidad(caducidad: number);
  isTimeValid();
  toStringDeep();
  toString();
}
