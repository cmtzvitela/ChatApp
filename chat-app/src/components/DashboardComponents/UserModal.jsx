import { ListItem, ListItemAvatar, Avatar, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { sagasGroupParticipants } from '../../redux/sagaActions';
import { useEffect, useState } from 'react';

export default function UserModal({ name, avatar, friendID }) {
  const userID = useSelector((state) => state.user.profile._id);
  const dispatch = useDispatch();
  const groupParticipants = [];

  // useEffect(() => {
  //   console.log('🚀 ~ groupParticipants:', groupParticipants);
  //   dispatch(sagasGroupParticipants(groupParticipants));
  // }, [groupParticipants, dispatch]);

  // function handleCheckboxSelection(value) {
  //   console.log('🚀 ~ value:', value);
  //   const newGroup = [...groupParticipants, { participantID: value, isGroupAdmin: false }];
  //   console.log('🚀 ~ newGroup:', newGroup);
  //   console.log('🚀 ~ groupParticipants:', groupParticipants);
  //   return groupParticipants;
  // }

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
