import express from 'express';
import User from '../models/user.js';
import { auth } from '../middlewares/authentication.js';
import { IUser } from '../models/user.js';
import multer from 'multer';
import sharp from 'sharp';
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
    const user: any = await User.findByCredentials(req.body.email, req.body.password);
    console.log(req.body);
    console.log(user);
    const token: string = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send('Something went wrong');
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
  },
});

router.post(
  '/dashboard/avatar',
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.get('/me', auth, async (req: any, res: any) => {
  res.send(req.user);
});

export default router;
