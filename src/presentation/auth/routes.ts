import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const database = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(database);
    const controller = new AuthController(authRepository);

    router.post('/login', controller.logingUser);
    router.post('/register', controller.registerUser);

    router.get('/users', [AuthMiddleware.validateJWT], controller.getUSers);

    return router;
  }
}
