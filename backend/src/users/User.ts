export class User {
  private userId: number;
  private username: string;

  constructor(userId: number, username: string) {
    this.userId = userId;
    this.username = username;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getUserName(): string {
    return this.username;
  }
}
