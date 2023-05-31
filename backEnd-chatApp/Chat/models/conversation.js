import { Schema, model } from 'mongoose';

const conversationSchema = new Schema(
  {
    participants: [
      {
        participantID: {
          type: String,
          required: true,
        },
        isAdmin: {
          type: Boolean,
          required: true,
        },
      },
    ],
    name: { type: String },
    isGroup: Boolean,
  },
  { timestamps: true }
);

const Conversation = model('Conversation', conversationSchema);

export default Conversation;
