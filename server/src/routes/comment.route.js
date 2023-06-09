import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const commentRouter = Router();

// Public
commentRouter.get('/:mediaId', commentController.getCommentsOfMedia);

// Private
commentRouter.use(verifyToken);

commentRouter.get('/', commentController.getCommentsOfUser);
commentRouter.post('/', commentController.addComment);
commentRouter.delete('/:commentId', commentController.deleteComment);
// TODO: edit comment

export default commentRouter;
