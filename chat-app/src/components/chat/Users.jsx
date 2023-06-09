import { Fragment } from 'react';
import { List } from '@mui/material';

import User from './User.jsx';

export default function Users({ friends }) {
  console.log('🚀 ~ friends:', friends);

  return (
    <List>
      {friends && (
        <Fragment>
          {friends.map((element, index) => (
            <User key={index} name={element.username} avatar={element.avatar} friendID={element._id} />
          ))}
        </Fragment>
      )}
    </List>
  );
}
