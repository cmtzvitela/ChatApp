import express from 'express';
import User from '../models/user.js';
import { auth } from '../middlewares/authentication.js';
import { IUser } from '../models/user.js';
import generateAvatar from '../utils/avatarGenerator.js';
import multer from 'multer';
import sharp from 'sharp';
const router = express.Router();

router.post('/signup', async (req: any, res: any) => {
  const user = new User<IUser>(req.body);
  const avatar = generateAvatar(user.email);
  user.avatar = avatar;
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
    const token: string = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send('Something went wrong');
  }
});

router.post('/friendRequests', async (req: any, res: any) => {
  try {
    const requested: any = await User.find({ email: req.body.friendEmail });
    console.log('🚀 ~ requested:', requested[0]);
    const newFriendRequest = { requestorID: req.body.requestorID, status: false };
    requested[0].friendRequests.push(newFriendRequest);
    console.log('🚀 ~ req-body.friendRequest:', requested[0].friendRequests);
    await requested[0].save();
    res.send(newFriendRequest);
  } catch (e) {
    res.status(400).send("Couldn't send request");
  }
});

router.get('/search_user', async (req: any, res: any) => {
  try {
    const results: any = await User.find({ username: req.body.username }, 'username id avatar');
    if (results.length < 1) {
      return res.send('No users with that name were found');
    } else {
      res.send(results);
      return results;
    }
  } catch (e) {
    res.status(400).send('Users could not be retrieved');
  }
});

router.get('/user/:id', async (req: any, res: any) => {
  console.log('Executing function');
  try {
    const user: any = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send('User could not be found');
    }
    console.log('🚀 ~ user:', user);
    return res.send(user);
  } catch (e) {
    res.status(400).send('Users could not be retrieved');
  }
});
// const upload = multer({
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error('Please upload an image'));
//     }

//     cb(undefined, true);
//   },
// });

// router.post(
//   '/dashboard/avatar',
//   upload.single('avatar'),
//   async (req, res) => {
//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
//     req.user.avatar = buffer;
//     await req.user.save();
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );
// router.get('/me', auth, async (req: any, res: any) => {
//   res.send(req.user);
// });

export default router;
