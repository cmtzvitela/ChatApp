import { Button } from '@mui/material';
import React from 'react';

export default function GeneralPurposeButton({ buttonText }) {
  return (
    <Button variant="contained" color="primary">
      {buttonText}
    </Button>
  );
}
