import { StatusCodes } from "http-status-codes";

export class HttpException extends Error {
  constructor(
    message: string,
    public statusCode: StatusCodes,
    public result: any = null,
  ) {
    super(message);
  }
}
