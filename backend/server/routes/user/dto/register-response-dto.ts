import { UserDto } from "./user-dto";

export class RegisterResponseDto {
  constructor(
    public accessToken: string,
    public user: UserDto,
  ) {}
}
