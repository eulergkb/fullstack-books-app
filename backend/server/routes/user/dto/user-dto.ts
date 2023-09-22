import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string | null;

  @Expose()
  phone: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;
}
