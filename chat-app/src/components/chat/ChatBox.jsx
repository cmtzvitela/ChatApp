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
import { gql, useQuery, useMutation } from '@apollo/client';
import { sendMessage } from '../../services/userServices';

const GET_MESSAGES = gql`
  query ConversationMessages($input: conversationID) {
    conversationMessages(input: $input) {
      body
      createdAt
      senderID
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation CreateMessage($input: messageInput!) {
    createMessage(input: $input) {
      body
      createdAt
      senderID
    }
  }
`;
const conversationID = { conversationID: '6452e689d2a731fde8b76c25' };
export default function ChatBox({ scope }) {
  const [newMessage, setNewMessage] = useState('');
  const userID = useSelector((state) => state.user.profile._id);
  console.log('🚀 ~ userID:', userID);
  let chatBottom = useRef(null);

  const [createNewMessage, { data: data2, loading2: loading2, error: error2 }] = useMutation(CREATE_MESSAGE);
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { input: conversationID },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // console.log(error);
  console.log(data.conversationMessages);
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
              {data.conversationMessages.map((element, index) => {
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
                            conversationID: '6452e689d2a731fde8b76c25',
                            senderID: '64248257460053c9e3c5ca96',
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
