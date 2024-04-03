import { Request, Response } from 'express';

export class AuthController {
  constructor() { }

  registerUser = (req: Request, res: Response) => {
    res.json('Register route Controller');
  }

  logingUser = (req: Request, res: Response) => {
    res.json('Login route Controller');
  }

}