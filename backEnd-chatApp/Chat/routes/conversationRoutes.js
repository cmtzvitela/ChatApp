import express from 'express';
import Conversation from '../models/conversation.js';

const conversationRouter = express.Router();

conversationRouter.post('/chats', async (req, res) => {
  const conversation = new Conversation(req.body);
  try {
    await conversation.save();
    res.status(201).send(conversation);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});
export default conversationRouter;
