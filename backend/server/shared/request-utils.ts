import { validate } from "class-validator";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { HttpException } from "./exceptions";
import { BaseResult } from "./responses";
import { StatusCodes } from "http-status-codes";

export async function transformAndValidate<
  TClass extends ClassConstructor<any>,
>(
  payload: any,
  clsType: new (...args) => TClass,
  validateRequest = true,
): Promise<TClass> {
  const instance = plainToInstance<TClass, any>(clsType, payload);
  if (validateRequest) {
    const validationErrors = await validate(instance, {});
    if (validationErrors.length) {
      const errorPayload: BaseResult = {
        status: "validation-error",
        validationErrors: validationErrors.map((error) => ({
          value: error.value,
          property: error.property,
          messages: Object.values(error.constraints as object),
        })),
      };
      throw new HttpException(
        "One or more validation errors occurred",
        StatusCodes.BAD_REQUEST,
        errorPayload,
      );
    }
  }

  return instance;
}

export const createDataResult = <TData>(data: TData) =>
  <BaseResult>{
    status: "ok",
    data,
  };

export const createTransformedResult = <TResult>(
  data: any,
  targetCls: new (...args) => any,
) =>
  createDataResult<TResult>(
    plainToInstance(targetCls, data, { excludeExtraneousValues: true }),
  );
