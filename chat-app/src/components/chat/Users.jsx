import { Fragment } from 'react';
import { List } from '@mui/material';
import { useSelector } from 'react-redux';
import { gql, useLazyQuery } from '@apollo/client';
import User from './User.jsx';
import { sagasChatMessages, sagasConversation } from '../../redux/sagaActions.js';
import { useDispatch } from 'react-redux';

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
export default function Users({ friends }) {
  const userID = useSelector((state) => state.user.profile._id);
  const dispatch = useDispatch();
  const [getConversationMessages, { loading: getMessagesLoading, error: getMessagesError, data: getMessagesData }] =
    useLazyQuery(GET_MESSAGES);
  const [getConversation, { loading: getConversationLoading, error: getConversationError, data: getConversationData }] =
    useLazyQuery(GET_CONVERSATION_ID);
  if (getMessagesLoading) return 'Loading...';
  if (getMessagesError) return `Error! ${getMessagesError.message}`;
  console.log('🚀 ~ friends:', friends);

  if (getConversationLoading) return <h1>Loading...</h1>;

  async function setActiveConversation(conversationID) {
    await getConversationMessages({
      variables: { input: { conversationID } },
    });
    console.log('🚀 ~ messages:', getMessagesData.conversationMessages);

    return dispatch(sagasChatMessages(getMessagesData.conversationMessages));
  }
  return (
    <List>
      {friends && (
        <Fragment>
          {friends.map((element, index) => (
            <User
              onClick={async (event, friend) => {
                const conversationObject = await getConversation({
                  variables: { input: { participant1: userID, participant2: friend.friendID } },
                });
                const conversationID = conversationObject.data.getConversation._id;
                dispatch(sagasConversation(conversationID));
                setActiveConversation(conversationID);
              }}
              key={index}
              name={element.username}
              avatar={element.avatar}
              friendID={element._id}
            />
          ))}
        </Fragment>
      )}
    </List>
  );
}
