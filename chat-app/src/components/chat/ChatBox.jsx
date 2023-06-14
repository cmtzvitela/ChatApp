import React, { useState, useRef } from 'react';
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
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

const CREATE_MESSAGE = gql`
  mutation CreateMessage($input: messageInput!) {
    createMessage(input: $input) {
      body
      createdAt
      senderID
    }
  }
`;

export default function ChatBox({ conversationMessages, scope }) {
  const conversationID = useSelector((state) => {
    return state.user.activeConversation;
  });
  console.log('🚀 ~ conversationID:', conversationID);
  const [newMessage, setNewMessage] = useState('');
  const userID = useSelector((state) => state.user.profile._id);
  console.log('🚀 ~ userID:', userID);
  let chatBottom = useRef(null);

  const [createNewMessage] = useMutation(CREATE_MESSAGE);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper square elevation={2}>
          <Typography color="inherit" variant="h6">
            {scope}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sx={{ textAlignLast: 'right' }}>
            <List>
              {conversationMessages &&
                conversationMessages.map((element, index) => {
                  return (
                    <ListItem key={index} sx={{ flexDirection: 'row-reverse' }}>
                      <ListItemAvatar>
                        <Avatar sx={{ marginLeft: '10px' }}>Avatar</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={element.senderID} secondary={element.body} />
                    </ListItem>
                  );
                })}
            </List>
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
                <Grid item xs={1} sx={{ alignSelf: 'center', textAlignLast: 'center' }}>
                  <Send
                    type="submit"
                    cursor="pointer"
                    onClick={() =>
                      createNewMessage({
                        variables: {
                          input: {
                            body: newMessage,
                            conversationID: conversationID,
                            senderID: userID,
                          },
                        },
                      })
                    }
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
