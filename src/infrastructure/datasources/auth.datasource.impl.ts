import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
import { UserMapper } from '../mappers/user.mapper';

type HasFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDataSourceImpl implements AuthDatasource {

  constructor(
    private readonly hasPassword: HasFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) { }

  async loginUser(loginrUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginrUserDto;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw CustomError.notFound('User not found');
      }

      const isMatch = this.comparePassword(password, user.password);
      if (!isMatch) {
        throw CustomError.unauthorized('Invalid credentials');
      }

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      throw CustomError.internal();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {

      const exist = await UserModel.findOne({ email });
      if (exist) {
        throw CustomError.conflict('Email already exists');
      }

      const user = await UserModel.create({ name, email, password: this.hasPassword(password) });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal();
    }
  }
}