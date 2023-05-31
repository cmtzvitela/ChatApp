import express from 'express';
import Message from '../models/message.js';

const messagesRouter = express.Router();

messagesRouter.post('/message', async (req, res) => {
  const message = new Message(req.body);
  try {
    await message.save();
    res.status(201).send(message);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

messagesRouter.get('/message/:conversationID', async (req, res) => {
  const chatMessages = await Message.find({ conversationID: req.params.conversationID });
  try {
    console.log(chatMessages);

    return res.status(201).send(chatMessages);
  } catch (e) {
    return res.status(400).send(e);
  }
});
export default messagesRouter;
