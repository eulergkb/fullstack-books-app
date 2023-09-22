import { type UserDto } from './user-dto'

export interface RegisterResponseDto {
  accessToken: string
  user: UserDto
}
