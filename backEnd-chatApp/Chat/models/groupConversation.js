import { Schema, model } from 'mongoose';

const groupConversationSchema = new Schema(
  {
    participants: [
      {
        participantID: String,
        isGroupAdmin: Boolean,
      },
    ],
    groupName: String,
    creatorID: String,
  },
  { timestamps: true }
);

const GroupConversation = model('GroupConversation', groupConversationSchema);

export default GroupConversation;
