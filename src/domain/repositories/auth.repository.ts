import { LoginUserDto, UserEntity } from "..";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

export abstract class AuthRepository {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}