import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@qflix.lpxdph9.mongodb.net/`, // or replace url by process.env.MONGODB_URL
    );
    console.log('Database connection has been established successfully');
  } catch (err) {
    console.error('Unable to connect to the database: ', err);
    process.exit(1);
  }
};

/** Hoặc có thể paste trực tiếp đoạn code này vô src/server.js */
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => console.log('Database connection has been established successfully'))
//   .catch((err) => {
//     console.error('Unable to connect to the database: ', err);
//     process.exit(1);
//   });

export default connectDb;
