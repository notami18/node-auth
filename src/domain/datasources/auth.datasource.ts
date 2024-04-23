import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract loginUser(loginrUserDto: LoginUserDto): Promise<UserEntity>;
}