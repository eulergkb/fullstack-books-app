import {IsEmail, IsOptional, IsString, MinLength} from "class-validator";

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
