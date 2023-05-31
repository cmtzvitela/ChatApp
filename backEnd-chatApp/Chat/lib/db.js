import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const dbConnect = () => {
  const URL = `mongodb://127.0.0.1:27017/chat-app`;

  return mongoose.connect(URL);
};

export default dbConnect;
