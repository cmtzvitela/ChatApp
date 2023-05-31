import react, { Fragment } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import User from './User.jsx';

export default function Users({ friends }) {
  return (
    <List>
      {friends && (
        <Fragment>
          {friends.map((element, index) => (
            <User key={index} name={element.username} avatar={element.avatar} />
          ))}
        </Fragment>
      )}
    </List>
  );
}
