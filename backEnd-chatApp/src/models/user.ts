import { model, SchemaType, Types, Schema, Model } from 'mongoose';
import validator from 'validator';
import variables from '../config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface IUser {
  username: string;
  email: string;
  password: string;
  tokens: Array<string>;
  friends: Array<Types.ObjectId>;
}

interface IUserMethods {
  generateAuthToken(): string;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(email: string, password: string): IUser;
  findUserById(id: string): IUser;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value: string): void {
        if (value.toLowerCase().includes('password')) {
          throw new Error("Password cannot contain the word 'password'");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    friends: [
      {
        id: {
          type: Schema.Types.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.method('generateAuthToken', async function generateAuthToken() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET!);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
});

userSchema.static('findByCredentials', async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('No email found');
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Wrong password');
  }
  
  return user;
});

userSchema.static('findUserById', async (id: string) => {
  const user = await User.findOne({ id });
  if (!user) {
    throw new Error('User not found');
  }

  return user;
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
