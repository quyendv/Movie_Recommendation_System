import { Router } from 'express';
import * as mediaController from '../controllers/media.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const mediaRouter = Router();

// need token to check isFav of user (if no authorization ~ no fav (guest), else isFav of current user)
mediaRouter.get('/favorite/:mediaId', verifyToken, mediaController.isFavoriteOfUser);

export default mediaRouter;
