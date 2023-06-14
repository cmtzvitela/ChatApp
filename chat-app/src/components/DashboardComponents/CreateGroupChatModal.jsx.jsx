import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ModalFriendList from './ModalFriendList';
import { useSelector } from 'react-redux';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { TextField, List } from '@mui/material';
import { Fragment } from 'react';
import UserModal from './UserModal';

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

const CREATE_GROUP_CONVERSATION = gql`
  mutation CreateGroupConversation($input: groupConversationInput!) {
    createGroupConversation(input: $input) {
      participants {
        isGroupAdmin
        participantID
      }
      groupName
      creatorID
    }
  }
`;
export default function CreateGroupChatModal() {
  const userID = useSelector((state) => state.user.profile._id);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState();
  const [helperText, setHelperText] = useState('');
  const groupParticipants = [{ participantID: userID, isGroupAdmin: true }];
  const friends = useSelector((state) => state.user.profile.friends);
  console.log('🚀 ~ friends:', friends);
  const [createGroupConversation] = useMutation(CREATE_GROUP_CONVERSATION);

  const [getUserFriends, { loading, error, data }] = useLazyQuery(GET_USER_FRIENDS);

  const handleOpen = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (error) {
      return <h1>{error}</h1>;
    }
    getUserFriends({
      variables: {
        input: friends.map((friend) => {
          return { id: friend.id };
        }),
      },
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleCheckboxSelection(value) {
    console.log('🚀 ~ value:', value);
    groupParticipants.push({ participantID: value, isGroupAdmin: false });
    console.log('🚀 ~ groupParticipants:', groupParticipants);
    return groupParticipants;
  }
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
          <h2>Group Name</h2>
          <TextField
            required
            helperText={helperText}
            label="Group Name"
            onChange={function (event) {
              if (!groupName) {
                setHelperText('Group must have a name');
              }
              setHelperText('');
              return setGroupName(event.target.value);
            }}
          ></TextField>
          <h2 id="parent-modal-title">Select participants</h2>
          {data && (
            <List
              onClick={(e) => {
                console.log(e.target.value);
                handleCheckboxSelection(e.target.value);
              }}
              sx={{ backgroundColor: '#ededed', borderRadius: '5px' }}
            >
              {data && (
                <Fragment>
                  {data.getUserFriends.map((element, index) => (
                    <UserModal
                      value={element._id}
                      key={index}
                      name={element.username}
                      avatar={element.avatar}
                      friendID={element._id}
                    />
                  ))}
                </Fragment>
              )}
            </List>
            // <ModalFriendList
            //   button={true}
            //   onClick={(e) => {
            //     console.log(e.target.value);
            //     handleCheckboxSelection(e.target.value);
            //   }}
            //   friends={data?.getUserFriends}
            // />
          )}

          <Button
            onClick={() =>
              createGroupConversation({
                variables: {
                  input: {
                    participants: groupParticipants,
                    groupName: groupName,
                    creatorID: userID,
                  },
                },
              })
            }
            variant="contained"
          >
            Create Group
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
