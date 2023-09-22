import { UserDto } from "./user-dto";

export type LoginStatus = "success" | "invalid-credentials";

export class LoginResponseDto {
  status: LoginStatus;
  accessToken?: null | string;
  user?: UserDto;
}
