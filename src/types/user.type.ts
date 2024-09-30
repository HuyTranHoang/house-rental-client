export interface User {
  id: number
  username: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  avatarUrl: string
  balance: number
  roles: string[]
  authorities: string[]
  createdAt: string
  active: boolean
  nonLocked: boolean
}
