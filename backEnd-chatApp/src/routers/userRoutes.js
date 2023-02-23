import express from 'express';
import User from '../models/user.js';
const router = new express.Router();

router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  console.log('🚀 ~ user', user);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
    console.log(user);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

export default router;
