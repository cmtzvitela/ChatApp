import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardSearch from '../DashboardComponents/DashboardSearch';

export default function Workspace() {
  const user = useSelector((state) => state.user.profile);
  const [searchUser, setSearchUser] = useState('');
  return (
    <Container sx={{ display: 'flex', backgroundColor: 'white' }}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          <h1>{user.username}</h1>
        </Grid>
        <Grid item xs={6} md={4}>
          <h1>{user.email}</h1>
        </Grid>
        <Grid container>
          <DashboardSearch
            searchUser={searchUser}
            onChange={function (event) {
              return setSearchUser(event.target.value);
            }}
          ></DashboardSearch>
        </Grid>
      </Grid>
    </Container>
  );
}
