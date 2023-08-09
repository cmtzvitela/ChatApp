import { Fragment } from 'react';
import { List } from '@mui/material';
import { useSelector } from 'react-redux';
import { gql, useLazyQuery } from '@apollo/client';
import User from './User.jsx';
import { sagasChatMessages, sagasConversation } from '../../redux/sagaActions.js';
import { useDispatch } from 'react-redux';
import GroupConversation from './groupConversation.jsx';

const GET_MESSAGES = gql`
  query ConversationMessages($input: conversationID) {
    conversationMessages(input: $input) {
      body
      createdAt
      senderID
    }
  }
`;
const GET_CONVERSATION_ID = gql`
  query GetConversation($input: conversationInput) {
    getConversation(input: $input) {
      _id
    }
  }
`;
export default function GroupConversations({ groupConversations }) {
  const userID = useSelector((state) => state.user.profile._id);
  const dispatch = useDispatch();
  const [getConversationMessages, { loading: getMessagesLoading, error: getMessagesError, data: getMessagesData }] =
    useLazyQuery(GET_MESSAGES);
  if (getMessagesLoading) return 'Loading...';
  if (getMessagesError) return `Error! ${getMessagesError.message}`;
  async function setActiveConversation(conversationID) {
    await getConversationMessages({
      variables: { input: { conversationID } },
    });
    console.log('🚀 ~ messages:', getMessagesData.conversationMessages);

    return dispatch(sagasChatMessages(getMessagesData.conversationMessages));
  }
  return (
    <List>
      {groupConversations && (
        <Fragment>
          {groupConversations?.map((element, index) => (
            <GroupConversation groupName={element.groupName} key={index} />
          ))}
        </Fragment>
      )}
    </List>
  );
}
