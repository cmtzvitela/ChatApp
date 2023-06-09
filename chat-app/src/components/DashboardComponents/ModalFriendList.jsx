import { Fragment } from 'react';
import { List } from '@mui/material';
import UserModal from './UserModal.jsx';

export default function ModalFriendList({ friends }) {
  return (
    <List sx={{ backgroundColor: '#ededed', borderRadius: '5px' }}>
      {friends && (
        <Fragment>
          {friends.map((element, index) => (
            <UserModal key={index} name={element.username} avatar={element.avatar} friendID={element._id} />
          ))}
        </Fragment>
      )}
    </List>
  );
}
