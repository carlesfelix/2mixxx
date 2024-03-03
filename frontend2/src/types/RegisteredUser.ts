import type AnyUser from './AnyUser'

export default interface RegisteredUser extends AnyUser {
  email: string
  role: string
}
