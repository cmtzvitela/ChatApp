import { ListItem, ListItemText, ListItemAvatar, Avatar, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export default function UserModal({ name, avatar, friendID }) {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.profile._id);
  const innerFriendID = friendID;

  return (
    <ListItem>
      <FormGroup sx={{ display: 'contents' }}>
        <FormControlLabel control={<Checkbox value={friendID} />} label={name} />
        <ListItemAvatar>
          <Avatar src={avatar}></Avatar>
        </ListItemAvatar>
      </FormGroup>
    </ListItem>
  );
}
