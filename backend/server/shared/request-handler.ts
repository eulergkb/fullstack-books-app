import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "./responses";
import { User } from "@prisma/client";
import { transformAndValidate } from "./request-utils";
import { StatusCodes } from "http-status-codes";

type HandlerCallback = (
  req: UserRequest,
  res: Response,
) => Promise<ApiResponse | void>;

type UserRequest = Request & {
  user?: User;
  getBody: <TBody>(body: new (...args) => any) => Promise<TBody>;
  getParams: <TParams>(params: new (...args) => any) => Promise<TParams>;
  getQuery: <TQuery>(query: new (...args) => any) => Promise<TQuery>;
};

function requestHandler(handlerCallback: HandlerCallback) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const userRequest = req as UserRequest;

      userRequest.getBody = <TBody>(
        body: new (...args) => any,
      ): Promise<TBody> => transformAndValidate(req.body, body);
      userRequest.getParams = <TParams>(
        params: new (...args) => any,
      ): Promise<TParams> => transformAndValidate(req.params, params);
      userRequest.getQuery = <TQuery>(
        query: new (...args) => any,
      ): Promise<TQuery> => transformAndValidate(req.query, query);

      const response = await handlerCallback(userRequest, res);
      if (response instanceof ApiResponse) {
        response.sendHttpResponse(res);
      } else {
        res.status(StatusCodes.NO_CONTENT).end();
      }
    } catch (error) {
      next(error);
    }
  };
}

export default requestHandler;
