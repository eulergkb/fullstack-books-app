import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export type ResultStatus =
  | "ok"
  | "not-found"
  | "validation-error"
  | "bad-request"
  | "internal-server-error"
  | "unauthorized";

export interface BaseResult<TModel = any> {
  status: ResultStatus;
  error?: any;
  validationErrors?: any[];
  data?: TModel;
}

export interface PaginatedResult<TModel> {
  totalCount: number;
  items: TModel[];
}

export class ApiResponse {
  constructor(
    protected response: any = undefined,
    protected status: StatusCodes = StatusCodes.OK,
  ) {}

  sendHttpResponse(res: Response, end = true) {
    res.status(this.status);
    if (this.response !== undefined) {
      res.json(this.response);
    }

    if (end) {
      res.end();
    }
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(error: any) {
    const result: BaseResult = {
      status: "bad-request",
      error,
    };
    super(result, StatusCodes.BAD_REQUEST);
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message: string = "Entity not found") {
    const result: BaseResult = {
      status: "not-found",
      error: message,
    };
    super(result);
  }
}

export class NoContentResponse extends ApiResponse {
  constructor() {
    super(undefined, StatusCodes.NO_CONTENT);
  }
}
