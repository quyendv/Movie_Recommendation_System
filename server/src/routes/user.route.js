import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);

export default userRouter;
