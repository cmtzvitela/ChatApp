import { Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import GeneralPurposeButton from '../GeneralComponents/GeneralPurposeButton';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

const CREATE_FRIEND_REQUEST = gql`
  mutation CreateFriendRequest($input: friendRequestInput!) {
    createFriendRequest(input: $input) {
      friendEmail
      requestorID
    }
  }
`;

export default function DashboardSearch() {
  const userID = useSelector((state) => state.user.profile._id);
  console.log('🚀 ~ userID:', userID);
  const [createFriendRequest, { data, loading, error }] = useMutation(CREATE_FRIEND_REQUEST);
  console.log('🚀 ~ data:', data);
  const [searchUser, setSearchUser] = useState('');

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  const friendRequestInput = {
    friendEmail: searchUser,
    requestorID: userID,
  };
  console.log('🚀 ~ friendRequestInput:', friendRequestInput);

  return (
    <Container>
      <TextField
        id="outlined-search"
        label="Search user..."
        type="search"
        onChange={(event) => {
          return setSearchUser(event.target.value);
        }}
      />
      <GeneralPurposeButton
        buttonText="Add Friend"
        onClick={() =>
          createFriendRequest({
            variables: {
              input: friendRequestInput,
            },
          })
        }
      ></GeneralPurposeButton>
    </Container>
  );
}
