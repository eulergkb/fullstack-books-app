import { NextFunction, Request, Response } from "express";
import jwtService from "../services/jwt-service";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../db";
import { ApiResponse, BaseResult } from "../shared/responses";
import { StatusCodes } from "http-status-codes";

export default function auth() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const header = req.header("Authorization");
    if (header) {
      const parts = header.split(" ");
      if (parts.length > 1) {
        const payload = jwtService.decodeToken(parts[1]) as JwtPayload;
        if (payload && payload.userId) {
          const plainRequest = req as any;
          plainRequest.user = await prisma.user.findUnique({
            where: {
              id: Number(payload.userId),
            },
          });
        }
      }
    }
    next();
  };
}

export function authorize() {
  return function (req: Request, res: Response, next: NextFunction) {
    const plainRequest = req as any;
    if (!plainRequest.user) {
      const result: BaseResult = {
        status: "unauthorized",
        error: "Authentication required to access resource",
      };

      return new ApiResponse(result, StatusCodes.UNAUTHORIZED).sendHttpResponse(
        res,
      );
    }

    next();
  };
}
