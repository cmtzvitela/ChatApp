import { Container, TextField } from '@mui/material';
import React from 'react';
import InteractiveList from '../GeneralComponents/ListComponent';
import GeneralPurposeButton from '../GeneralComponents/GeneralPurposeButton';
import { sagasSearch } from '../../redux/sagaActions.js';

export default function DashboardSearch(searchUser) {
  function handleSearch() {
    try {
      dispatchEvent(sagasSearch(searchUser));
    } catch (e) {}
  }
  return (
    <Container>
      <TextField id="outlined-search" label="Search user..." type="search" />
      <GeneralPurposeButton buttonText="Search" onClick={handleSearch}></GeneralPurposeButton>
      <InteractiveList></InteractiveList>
    </Container>
  );
}
