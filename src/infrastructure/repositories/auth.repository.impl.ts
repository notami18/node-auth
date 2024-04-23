import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';

export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private readonly authDatasource: AuthDatasource,
  ) { }

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.loginUser(loginUserDto);
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}