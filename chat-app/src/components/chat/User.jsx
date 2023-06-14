import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

export default function User({ name, avatar, onClick, friendID }) {
  const fullName = name + avatar;
  return (
    <ListItem
      button
      onClick={(event) => {
        onClick(event, { fullName, name, avatar, onClick, friendID });
      }}
    >
      <ListItemAvatar>
        <Avatar src={avatar}></Avatar>
      </ListItemAvatar>
      <ListItemText primary={name}></ListItemText>
    </ListItem>
  );
}
