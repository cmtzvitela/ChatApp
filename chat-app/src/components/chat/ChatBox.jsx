import React, { useState, useEffect, Fragment, useRef } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import { Send, Apps } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export default function ChatBox() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  let chatBottom = useRef(null);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper square elevation={2}>
          <Typography color="inherit" variant="h6">
            "Scope"
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            {messages && (
              <List>
                {messages.map((element) => {
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>Avatar</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={'m and name'} secondary={<Fragment>Message Body</Fragment>} />
                  </ListItem>;
                })}
              </List>
            )}
            <div ref={chatBottom} />
          </Grid>
          <Grid item xs={12}>
            <form>
              <Grid container alignItems="flex-end">
                <Grid item xs={11}>
                  <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Send type="submit" />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
