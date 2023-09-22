import { type RegisterUserDto } from '../shared/dto/register-user-dto'
import { type LoginDto } from '../shared/dto/login-dto'
import { type LoginResponseDto } from '../shared/dto/login-response-dto'
import { type UserDto } from '../shared/dto/user-dto'
import { type RegisterResponseDto } from '../shared/dto/register-response-dto'
import { BaseClient } from './base-client'
import { type BaseResultDto } from '../shared/dto/base-result-dto'

export class AuthClient extends BaseClient {
  constructor (protected baseUrl: string) {
    super(baseUrl)
  }

  async register (model: RegisterUserDto): Promise<RegisterResponseDto | BaseResultDto> {
    const response = await fetch(this.getAbsoluteUrl('/users/register'), {
      method: 'post',
      body: JSON.stringify({
        ...model,
        email: model.email || undefined,
        phone: model.phone || undefined
      }),
      headers: this.defaultHeaders
    })

    const body = await response.json()
    if (!response.status.toString().startsWith('2')) {
      return body as BaseResultDto
    }

    return body as RegisterResponseDto
  }

  async getCurrentUser (): Promise<UserDto> {
    const response = await fetch(this.getAbsoluteUrl('/users/me'), {
      method: 'get',
      headers: this.defaultHeaders
    })

    const payload = await response.json() as BaseResultDto<UserDto>
    return payload.data as UserDto
  }

  async login (model: LoginDto): Promise<LoginResponseDto> {
    const response = await fetch(this.getAbsoluteUrl('/users/login'), {
      method: 'post',
      body: JSON.stringify(model),
      headers: this.defaultHeaders
    })

    return await response.json() as LoginResponseDto
  }
}
