import { Router } from "express";
import requestHandler from "../../shared/request-handler";
import { ApiResponse, BadRequestResponse } from "../../shared/responses";
import { StatusCodes } from "http-status-codes";
import { RegisterUserDto } from "./dto/register-user-dto";
import prisma from "../../../db";
import passwordService from "../../services/password-service";
import { plainToInstance } from "class-transformer";
import { UserDto } from "./dto/user-dto";
import { RegisterResponseDto } from "./dto/register-response-dto";
import jwtService from "../../services/jwt-service";
import { LoginDto } from "./dto/login-dto";
import { LoginResponseDto } from "./dto/login-response-dto";
import { createTransformedResult } from "../../shared/request-utils";
import { authorize } from "../../middlewares/auth";

const router = Router();

router.post(
  "/register",
  requestHandler(async (req) => {
    const payload = await req.getBody<RegisterUserDto>(RegisterUserDto);
    const existingUser = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (existingUser) return new BadRequestResponse("Username already exists");

    const instance = await prisma.user.create({
      data: {
        username: payload.username,
        email: payload.email,
        phone: payload.phone,
        firstName: payload.firstName,
        lastName: payload.lastName,
        passwordHash: passwordService.hashPassword(payload.password),
      },
    });

    return new ApiResponse(
      new RegisterResponseDto(
        jwtService.signToken(instance.id),
        plainToInstance(UserDto, instance, { excludeExtraneousValues: true }),
      ),
      StatusCodes.CREATED,
    );
  }),
);

router.get(
  "/me",
  authorize(),
  requestHandler(async (req) => {
    const user = req.user;
    return new ApiResponse(createTransformedResult(user, UserDto));
  }),
);

router.post(
  "/login",
  requestHandler(async (req) => {
    const payload = await req.getBody<LoginDto>(LoginDto);
    const user = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    const result = new LoginResponseDto();
    if (
      user &&
      passwordService.isSamePassword(user.passwordHash, payload.password)
    ) {
      result.status = "success";
      result.accessToken = jwtService.signToken(user.id);
      result.user = plainToInstance(UserDto, user, {
        excludeExtraneousValues: true,
      });
      return new ApiResponse(result);
    }

    result.status = "invalid-credentials";
    return new ApiResponse(result, StatusCodes.BAD_REQUEST);
  }),
);

export default router;
