import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class GetBooksQuery {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  size: number = 1;

  @IsOptional()
  @IsString()
  filter?: string;
}
