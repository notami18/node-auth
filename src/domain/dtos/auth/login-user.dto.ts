import { Validators } from "../../../config/validators";

export class LoginUserDto {
  constructor(
    public email: string,
    public password: string
  ) { }

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Email is required'];
    if (!Validators.email.test(email)) return ['Invalid email'];
    if (!password) return ['Password is required'];
    if (password.length < 6) return ['Password must be at least 6 characters'];

    return [
      undefined,
      new LoginUserDto(email, password)
    ]
  }
}