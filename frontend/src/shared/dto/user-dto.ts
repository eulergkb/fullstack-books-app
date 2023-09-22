export interface UserDto {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string | null
  phone: string | null
  createdAt: Date
  updatedAt: Date | null
}
