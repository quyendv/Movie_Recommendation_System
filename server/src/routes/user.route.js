import * as userController from '../controllers/user.controller.js';
import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = Router();

// Public routes
userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);

// Private routes
userRouter.use(verifyToken);

userRouter.get('/info', userController.getInfo);
userRouter.put('/update-password', userController.updatePassword);

export default userRouter;
