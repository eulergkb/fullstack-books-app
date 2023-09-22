import { Request, Response, NextFunction } from "express";
import { HttpException } from "../shared/exceptions";
import { ApiResponse, BaseResult } from "../shared/responses";
import { StatusCodes } from "http-status-codes";

export function errorHandler() {
  return function (
    error: unknown,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    if (error instanceof HttpException) {
      return new ApiResponse(error.result, error.statusCode).sendHttpResponse(
        res,
      );
    }

    console.error("[ERROR]: An uncaught exception was captured", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(<BaseResult>{
      status: "internal-server-error",
      error: error?.toString() || undefined,
    });
  };
}
