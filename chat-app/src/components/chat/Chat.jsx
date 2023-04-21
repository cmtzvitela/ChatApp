import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Paper, Tabs, Tab } from '@mui/material';

import ChatBox from './ChatBox.jsx';
import Conversations from './Conversations.jsx';
import Users from './Users.jsx';

export default function Chat() {
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(null);

  const handleChange = (e, newVal) => {
    setTab(newVal);
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item md={4}>
          <Paper square elevation={5}>
            <Paper square>
              <Tabs
                onChange={handleChange}
                variant="fullWidth"
                value={tab}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Chats" />
                <Tab label="Users" />
              </Tabs>
            </Paper>
            {tab === 0 && <Conversations />}
            {tab === 1 && <Users />}
          </Paper>
        </Grid>
        <Grid item md={8}>
          <ChatBox />
        </Grid>
      </Grid>
    </Fragment>
  );
}
