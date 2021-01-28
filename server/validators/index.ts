import { MinLength } from 'class-validator'

export class LoginBody {
  name: string

  @MinLength(4)
  password: string
}
