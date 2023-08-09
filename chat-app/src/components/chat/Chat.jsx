import React, { Fragment } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';

import ChatBox from './ChatBox.jsx';
import Users from './Users.jsx';
import GroupConversations from './groupConversations.jsx';

const GET_USER_FRIENDS = gql`
  query GetUserFriends($input: [userID]) {
    getUserFriends(input: $input) {
      _id
      avatar
      email
      username
    }
  }
`;

const GET_GROUP_CONVERSATIONS = gql`
  query GetGroupConversations($input: userID) {
    getGroupConversations(input: $input) {
      groupName
      participants {
        isGroupAdmin
        participantID
      }
      creatorID
      _id
    }
  }
`;

export default function Chat() {
  const friends = useSelector((state) => state.user.profile.friends);
  const conversationID = useSelector((state) => state.user.profile.activeConversation);
  const conversationMessages = useSelector((state) => state.user.chatMessages);
  const userID = useSelector((state) => state.user.profile._id);
  const getFriends = useQuery(GET_USER_FRIENDS, {
    variables: {
      input: friends?.map((friend) => {
        return { id: friend.id };
      }),
    },
  });

  const groupConversations = useQuery(GET_GROUP_CONVERSATIONS, {
    variables: {
      input: { id: userID },
    },
  });

  return (
    <Fragment>
      <Grid container>
        <Grid item md={4}>
          <Paper square elevation={5}>
            <Paper square>
              <Typography> Chats</Typography>
            </Paper>
            <Users friends={getFriends?.data?.getUserFriends} />
          </Paper>
          <Paper square elevation={5}>
            <Paper square>
              <Typography> Groups </Typography>
            </Paper>
            <GroupConversations groupConversations={groupConversations?.data?.getGroupConversations} />
            {console.log(groupConversations)}
          </Paper>
        </Grid>
        <Grid item md={8}>
          <ChatBox conversationMessages={conversationMessages} />
        </Grid>
      </Grid>
    </Fragment>
  );
}
