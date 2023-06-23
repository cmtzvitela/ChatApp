import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const dbConnect = () => {
  const URL = process.env.MONGODB_URL;

  return mongoose.connect(URL);
};

export default dbConnect;
