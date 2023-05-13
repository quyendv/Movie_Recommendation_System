import { Router } from 'express';
import * as favoriteController from '../controllers/favorite.controller.js';
import * as userController from '../controllers/user.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = Router();

// Public routes
userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);

// Private routes
userRouter.use(verifyToken);

userRouter.get('/info', userController.getInfo);
userRouter.put('/update-password', userController.updatePassword);

userRouter.get('/favorites', favoriteController.getListOfUser);
userRouter.post('/favorites', favoriteController.addFavorite);
userRouter.delete('/favorites/:favoriteId', favoriteController.removeFavorite);

export default userRouter;
