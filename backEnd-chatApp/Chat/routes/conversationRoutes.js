import express from 'express';
import Conversation from '../models/conversation.js';
import GroupConversation from '../models/groupConversation.js';

const conversationRouter = express.Router();

conversationRouter.post('/chat/:participant1&:participant2', async (req, res) => {
  const newConversation = new Conversation({
    participant1: req.params.participant1,
    participant2: req.params.participant2,
  });
  try {
    await newConversation.save();
    res.status(201).send(newConversation);
  } catch (e) {
    res.status(400).send(e);
  }
});

conversationRouter.post('/groupChat', async (req, res) => {
  const participantArray = [];
  req.body.participants.map((participant) => {
    return participantArray.push(participant);
  });

  const newGroupConversation = new GroupConversation({
    participants: participantArray,
    groupName: req.body.groupName,
    creatorID: req.body.creatorID,
  });

  try {
    await newGroupConversation.save();
    res.status(201).send(newGroupConversation);
  } catch (e) {
    res.status(400).send(e);
  }
});

conversationRouter.get('/chat/:participant1&:participant2', async (req, res) => {
  const conversation = await Conversation.findOne({
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
  if (conversation === null) {
    console.log('inside null conversation');
    res.status(400);
  }
  res.status(201).send(conversation);
  return conversation._id.toString();
});

conversationRouter.get('/groupChat/:participant', async (req, res) => {
  console.log('🚀 ~ req:', req.params);
  const conversations = await GroupConversation.find({
    'participants.participantID': { $in: [req.params.participant] },
  });
  console.log('🚀 ~ conversations:', conversations);
  if (conversations === [null]) {
    console.log('inside null conversation');
    res.status(400);
  }
  res.status(201).send(conversations);
  return conversations;
});

export default conversationRouter;
