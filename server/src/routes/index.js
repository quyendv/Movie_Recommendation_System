import commentRouter from './comment.route.js';
import userRouter from './user.route.js';

const initRoutes = (app) => {
  // app.use(path, otherRouter)
  app.use('/api/v1/user/', userRouter);
  app.use('/api/v1/comments/', commentRouter);

  app.use('/', (req, res) => {
    res.send('Server on root route');
  });
};

export default initRoutes;
