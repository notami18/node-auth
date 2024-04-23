import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}

type SignToken = (payload: Object, expiresIn?: string) => Promise<string | null>

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) { }

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

    const { id, email, name } = await this.authRepository.login(loginUserDto);

    const token = await this.signToken({ id }, '2h');

    if (!token) throw CustomError.internal('Error generating token');

    return {
      token: token,
      user: {
        id, email, name
      }
    }
  }
}