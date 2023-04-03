import express from 'express';
import User from '../models/user.js';
import { auth } from '../middlewares/authentication.js';
const router = express.Router();
router.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
});
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(req.body);
        console.log(user);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }
    catch (e) {
        res.status(400).send('Something went wrong');
    }
});
router.get('/me', auth, async (req, res) => {
    res.send(req.user);
});
export default router;
