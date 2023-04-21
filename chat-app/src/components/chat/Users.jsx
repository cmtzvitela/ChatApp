import react, { Fragment } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Users() {
  const friends = useSelector((state) => state.user.profile.friends);
  return (
    <List>
      {friends && (
        <Fragment>
          {friends.map((element) => (
            <ListItem button>
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
            </ListItem>
          ))}
        </Fragment>
      )}
    </List>
  );
}
