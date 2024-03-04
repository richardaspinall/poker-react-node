export class User {
  private name: string;
  private id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }
}
