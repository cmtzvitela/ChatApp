import { Schema, model } from 'mongoose';

const conversationSchema = new Schema(
  {
    participant1: { type: String },
    participant2: { type: String },
  },
  { timestamps: true }
);

const Conversation = model('Conversation', conversationSchema);

export default Conversation;
