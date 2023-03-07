import express from 'express';
import User from '../models/user.js';
import { auth } from '../middlewares/authentication.js';
import { IUser } from '../models/user.js';
const router = express.Router();

router.post('/signup', async (req: any, res: any) => {
  const user = new User<IUser>(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

router.post('/login', async (req: any, res: any) => {
  try {
    const user: any = User.findByCredentials(req.body.email, req.body.password);
    console.log(req.body);
    const token: string = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send('Something went wrong');
  }
});

router.get('/me', auth, async (req: any, res: any) => {
  res.send(req.user);
});

export default router;
