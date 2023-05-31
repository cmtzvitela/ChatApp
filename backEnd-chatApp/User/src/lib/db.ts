import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const dbConnect = () => {
  const URL = `mongodb+srv://cmtzvitela:intekcoding@cluster0.w8yajn4.mongodb.net/chat`;

  return mongoose.connect(URL);
};

export default dbConnect;
