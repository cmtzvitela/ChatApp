import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

export default function Workspace() {
  return (
    <Container sx={{ display: 'flex', backgroundColor: 'white', zIndex: -5 }}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          <h1>xs=6 md=8</h1>
        </Grid>
        <Grid item xs={6} md={4}>
          <h1>xs=6 md=4</h1>
        </Grid>
        <Grid item xs={6} md={4}>
          <h1>xs=6 md=4</h1>
        </Grid>
        <Grid item xs={6} md={8}>
          <h1>xs=6 md=8</h1>
        </Grid>
      </Grid>
    </Container>
  );
}
