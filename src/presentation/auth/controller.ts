import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUserDto, RegisterUser, LoginUserDto, LoginUser } from '../../domain';
import { UserModel } from '../../data/mongodb';

export class AuthController {


  constructor(
    private readonly authRepository: AuthRepository
  ) { }

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((userToken) => res.json(userToken))
      .catch((error) => this.handleError(error, res));
  }

  logingUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((userToken) => res.json(userToken))
      .catch((error) => this.handleError(error, res));
  }
  getUSers = (req: Request, res: Response) => {
    UserModel.find().then((users) => {
      res.json({
        token: req.body.user
      });
    }).catch((error) => this.handleError(error, res));
  }

}