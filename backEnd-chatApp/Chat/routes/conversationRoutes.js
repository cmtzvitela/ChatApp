import express from 'express';
import Conversation from '../models/conversation.js';

const conversationRouter = express.Router();

conversationRouter.post('/chat', async (req, res) => {
  const conversation = new Conversation(req.body);
  try {
    await conversation.save();
    res.status(201).send(conversation);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

conversationRouter.get('/chat/:participant1&:participant2', async (req, res) => {
  console.log('🚀 ~ req.body:', req.params);
  try {
    const conversation = await Conversation.find({
      $or: [
        {
          participant1: req.params.participant1,
          participant2: req.params.participant2,
        },
        {
          participant1: req.params.participant2,
          participant2: req.params.participant1,
        },
      ],
    });
    res.status(201).send(conversation);
    return conversation[0]._id.toString();
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});
export default conversationRouter;
