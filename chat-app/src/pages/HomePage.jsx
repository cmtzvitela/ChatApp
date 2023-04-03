import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeneralPurposeButton from '../components/GeneralComponents/GeneralPurposeButton';

export default function HomePage() {
  const navigate = useNavigate();

  function handleLogIn() {
    navigate('/login', { replace: true });
  }
  function handleSignUp() {
    navigate('/signup', { replace: true });
  }
  return (
    <Grid>
      <Container sx={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
        <Typography variant="h2">Welcome to the Chat</Typography>
        <GeneralPurposeButton buttonText="Log In" onClick={handleLogIn}></GeneralPurposeButton>
        <GeneralPurposeButton buttonText="Sign Up" onClick={handleSignUp}></GeneralPurposeButton>
      </Container>
    </Grid>
  );
}
