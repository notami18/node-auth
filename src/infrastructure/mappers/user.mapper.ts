import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, roles } = object;

    if (!id || !_id) {
      throw CustomError.badRequest('User id not found');
    }

    if (!name) throw CustomError.badRequest('User name not found');


    if (!email) throw CustomError.badRequest('User email not found');


    if (!password) throw CustomError.badRequest('User password not found');


    if (!roles) throw CustomError.badRequest('User roles not found');


    return new UserEntity(id || _id, name, email, password, roles);
  }
}