import { type UserDto } from './user-dto'

export type LoginStatus = 'success' | 'invalid-credentials'

export interface LoginResponseDto {
  status: LoginStatus
  accessToken?: null | string
  user?: UserDto
}
