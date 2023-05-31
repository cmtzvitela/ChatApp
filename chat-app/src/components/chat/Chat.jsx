import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Paper, Tabs, Tab, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { gql, useQuery, useMutation } from '@apollo/client';

import ChatBox from './ChatBox.jsx';
import Conversations from './Conversations.jsx';
import Users from './Users.jsx';

const GET_USER_FRIENDS = gql`
  query GetUserFriends($input: [userID]) {
    getUserFriends(input: $input) {
      avatar
      email
      username
    }
  }
`;

export default function Chat() {
  const friends = useSelector((state) => state.user.profile.friends);
  console.log('🚀 ~ friends:', friends);
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(null);

  const { loading, error, data } = useQuery(GET_USER_FRIENDS, {
    variables: { input: [{ id: '645e80ba431ad2474a694972' }, { id: '645e80f3431ad2474a694976' }] },
  });

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
        </Grid>
        <Grid item md={8}>
          <ChatBox scope={tab} />
        </Grid>
      </Grid>
    </Fragment>
  );
}
