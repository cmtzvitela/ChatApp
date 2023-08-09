import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

export default function GroupConversation({ groupName, avatar, onClick, friendID }) {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={avatar}></Avatar>
      </ListItemAvatar>
      <ListItemText primary={groupName}></ListItemText>
    </ListItem>
  );
}
