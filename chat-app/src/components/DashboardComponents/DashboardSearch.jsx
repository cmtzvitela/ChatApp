import { Container, TextField } from '@mui/material';
import React from 'react';
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

export default function DashboardSearch({ searchUser }) {
  const userID = useSelector((state) => state.user.profile._id);
  const [createFriendRequest, { data, loading, error }] = useMutation(CREATE_FRIEND_REQUEST);
  return (
    <Container>
      <TextField id="outlined-search" label="Search user..." type="search" />
      <GeneralPurposeButton
        buttonText="Add Friend"
        onClick={() =>
          createFriendRequest({
            variables: {
              input: {
                friendEmail: searchUser,
                requestorID: userID,
              },
            },
          })
        }
      ></GeneralPurposeButton>
    </Container>
  );
}
