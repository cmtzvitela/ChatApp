import express, { Express, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const verifyToken = async (req: any, res: any, next: Function) => {
  try {
    const secret = process.env.JWT_SECRET!;

    const tokenHeaders = req.header('authorization');
    if (!tokenHeaders) {
      return new Error('Not a valid token provided');
    }
    const tokenArray = tokenHeaders.split(' ');
    const token = tokenArray[1];

    if (!token) {
      return new Error('Not a valid token provided');
    }
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (err) {}
};

export const auth = async (req: any, res: any, next: Function) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};
;
