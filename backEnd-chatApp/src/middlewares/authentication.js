import jwt from 'jsonwebtoken';
import { variables } from '../config/config.js';
import User from '../models/user.js';

const verifyToken = async (req, res, next) => {
  try {
    const secret = variables.JWT_SECRET;

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

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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

export default { verifyToken, auth };
