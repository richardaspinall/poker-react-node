export class User {
  private username: string;
  private userId: number;

  constructor(username: string, userId: number) {
    this.username = username;
    this.userId = userId;
  }

  public getUserName(): string {
    return this.username;
  }

  public getUserId(): number {
    return this.userId;
  }
}
