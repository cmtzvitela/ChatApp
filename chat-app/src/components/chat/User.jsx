import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { gql, useLazyQuery } from '@apollo/client';
import { sagasConversation } from '../../redux/sagaActions.js';

export default function User({ name, avatar, friendID }) {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.profile._id);
  const innerFriendID = friendID;
  const GET_CONVERSATION_ID = gql`
    query GetConversation($input: conversationInput) {
      getConversation(input: $input) {
        _id
      }
    }
  `;
  const [getConversation, { loading, error, data }] = useLazyQuery(GET_CONVERSATION_ID);
  if (loading) return <h1>Loading...</h1>;

  return (
    <ListItem
      button
      onClick={async () => {
        const conversationObject = await getConversation({
          variables: { input: { participant1: userID, participant2: innerFriendID } },
        });
        console.log('conversationObject Error', conversationObject.error);
        console.log('🚀 ~ conversationID:', conversationObject.data.getConversation._id);
        dispatch(sagasConversation(conversationObject.data.getConversation._id));
      }}
    >
      <ListItemAvatar>
        <Avatar src={avatar}></Avatar>
      </ListItemAvatar>
      <ListItemText primary={name}></ListItemText>
    </ListItem>
  );
}
