export class Address {
  constructor(address: string) {
    this.publickKey = address;
  }
  public get publickKey(): string {
    return this.publickKey;
  }

  public set publickKey(publickKey: string) {
    this.publickKey = publickKey;
  }
}
