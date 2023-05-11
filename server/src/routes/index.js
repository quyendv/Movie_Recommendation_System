import userRouter from './user.route.js';

const initRoutes = (app) => {
  // app.use(path, otherRouter)
  app.use('/api/v1/user/', userRouter);

  app.use('/', (req, res) => {
    res.send('Server on root route');
  });
};

export default initRoutes;
