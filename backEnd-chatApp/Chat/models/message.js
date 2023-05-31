import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    senderID: {
      type: String,
      required: true,
    },
    conversationID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);

export default Message;
