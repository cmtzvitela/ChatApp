import react, { Fragment } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

export default function User({ name, avatar }) {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={avatar}></Avatar>
      </ListItemAvatar>
      <ListItemText primary={name}></ListItemText>
    </ListItem>
  );
}
