import { IAddress } from './../interfaces/address.interface';
export class Address implements IAddress {
  private publickKey: string;
  public getPublickKey(): string {
    return this.publickKey;
  }

  public setPublickKey(publickKey: string) {
    this.publickKey = publickKey;
  }
  constructor(address: string) {
    this.publickKey = address;
  }
  toString(): string {
    return this.publickKey;
  }
}
