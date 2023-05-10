import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDb from './configs/db.config.js';
import initRoutes from './routes/index.js';

/** Config before app initializing app */
config(); // or directly import 'dotenv/config'
connectDb();

/** Init app with base config */
const app = express();
const port = process.env.PORT || 8000;

/** app.use(middleware) */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(morgan('tiny'));

/** Sau khi qua cors rồi (chạy theo thứ tự) thì check tiếp */
app.use(express.json()); // convert data client gửi lên sang json
app.use(express.urlencoded({ extended: true })); // convert data sang json từ những dạng như array, object, ...

/** routes: chú ý thứ tự sau cùng */
initRoutes(app);

/** Run */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
