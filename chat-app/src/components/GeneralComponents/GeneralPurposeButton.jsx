import { Button } from '@mui/material';
import React from 'react';

export default function GeneralPurposeButton({ buttonText, onClick }) {
  return (
    <Button onClick={onClick} variant="contained" color="primary">
      {buttonText}
    </Button>
  );
}
