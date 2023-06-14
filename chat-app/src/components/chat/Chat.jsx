import React, { Fragment } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';

import ChatBox from './ChatBox.jsx';
import Users from './Users.jsx';

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

export default function Chat() {
  const friends = useSelector((state) => state.user.profile.friends);
  const conversationID = useSelector((state) => state.user.profile.activeConversation);
  const { loading, error, data } = useQuery(GET_USER_FRIENDS, {
    variables: {
      input: friends.map((friend) => {
        return { id: friend.id };
      }),
    },
  });
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Fragment>
      <Grid container>
        <Grid item md={4}>
          <Paper square elevation={5}>
            <Paper square>
              <Typography> Chats</Typography>
            </Paper>
            <Users friends={data.getUserFriends} />
          </Paper>
          <Paper square elevation={5}>
            <Paper square>
              <Typography> Groups </Typography>
            </Paper>
            <Users friends={data.getUserFriends} />
          </Paper>
        </Grid>
        <Grid item md={8}>
          <ChatBox conversationMessages={conversationMessages} />
        </Grid>
      </Grid>
    </Fragment>
  );
}
