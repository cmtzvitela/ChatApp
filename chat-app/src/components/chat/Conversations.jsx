import React, { useState, useEffect, Fragment } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { Language } from '@mui/icons-material';

export default function Conversations() {
  const [conversations, setConversation] = useState([]);
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Language />
          </Avatar>
        </ListItemAvatar>
        <ListItemText />
      </ListItem>
      <Divider />

      {conversations && (
        <Fragment>
          {conversations?.map((element) => (
            <ListItem button>
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Recipient name" secondary={<Fragment>"Last Message"</Fragment>} />
            </ListItem>
          ))}
        </Fragment>
      )}
    </List>
  );
}
