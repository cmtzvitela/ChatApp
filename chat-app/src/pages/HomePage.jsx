import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GeneralPurposeButton from '../components/GeneralComponents/GeneralPurposeButton';
import { useTranslation } from 'react-i18next';

function Title() {
  const { t } = useTranslation();

  return <h2>{t('title')}</h2>;
}
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
        <Typography variant="h2">{Title()}</Typography>
        <GeneralPurposeButton buttonText="Log In" onClick={handleLogIn}></GeneralPurposeButton>
        <GeneralPurposeButton buttonText="Sign Up" onClick={handleSignUp}></GeneralPurposeButton>
      </Container>
    </Grid>
  );
}
