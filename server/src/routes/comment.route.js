import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const commentRouter = Router();

// Public

// Private
commentRouter.use(verifyToken);

commentRouter.get('/', commentController.getCommentsOfUser);
commentRouter.post('/', commentController.addComment);
commentRouter.delete('/:commentId', commentController.deleteComment);
commentRouter.get('/:mediaId', commentController.getCommentsOfMedia);

export default commentRouter;
