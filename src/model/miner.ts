export class Miner {
  private id: string;
  constructor(id: string) {
    this.id = id;
  }
  public getId(): string {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }
}
