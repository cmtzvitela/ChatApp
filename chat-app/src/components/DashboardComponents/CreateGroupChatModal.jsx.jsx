import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ModalFriendList from './ModalFriendList';
import { useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const GET_USER_FRIENDS = gql`
  query GetUserFriends($input: [userID]) {
    getUserFriends(input: $input) {
      _id
      avatar
      email
      username
    }
  }
`;
export default function CreateGroupChatModal() {
  const [open, setOpen] = useState(false);
  const friends = useSelector((state) => state.user.profile.friends);
  console.log('🚀 ~ friends:', friends);
  const { loading, error, data } = useQuery(GET_USER_FRIENDS, {
    variables: {
      input: friends.map((friend) => {
        return { id: friend.id };
      }),
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create Group Chat
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Select participants</h2>
          <ModalFriendList friends={data.getUserFriends} />
          <Button variant="contained">Create Group</Button>
        </Box>
      </Modal>
    </div>
  );
}
