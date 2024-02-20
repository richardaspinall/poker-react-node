import { Request, Response } from 'express';

export default abstract class BaseHandler<T> {
  public runHandler(req: Request, res: Response<T>) {
    return this.getResult(req, res);
  }
  protected abstract getResult(req: Request, res: Response<T>): any;
}
