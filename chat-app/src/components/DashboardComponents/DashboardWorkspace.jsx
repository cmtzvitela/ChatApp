import { Grid, Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardSearch from '../DashboardComponents/DashboardSearch';
import DashboardCreateGroup from './CreateGroupChatModal.jsx';
import CreateGroupChatModal from './CreateGroupChatModal.jsx';

export default function Workspace() {
  const user = useSelector((state) => state.user.profile);
  const [searchUser, setSearchUser] = useState('');
  const navigate = useNavigate();

  function navigateToChat() {
    navigate('/chat', { replace: true });
  }
  return (
    <Container sx={{ display: 'flex', backgroundColor: 'white' }}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          <h1>{user.username}</h1>
        </Grid>
        <Grid item xs={6} md={4}>
          <h1>{user.email}</h1>
        </Grid>
        <Button onClick={navigateToChat}>CHAT</Button>
        <Grid container>
          <DashboardSearch />
        </Grid>
        <Grid container>
          <CreateGroupChatModal/>
        </Grid>
      </Grid>
    </Container>
  );
}
