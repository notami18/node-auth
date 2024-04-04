import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
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

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) { }

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

    const { id, email, name } = await this.authRepository.register(registerUserDto);

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