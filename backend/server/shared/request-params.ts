import { IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class IdParam {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
