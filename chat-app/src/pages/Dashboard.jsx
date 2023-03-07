import { Box } from '@mui/material';
import ClippedDrawer from '../components/DashboardComponents/DashboardSideBar.jsx';
import Workspace from '../components/DashboardComponents/DashboardWorkspace.jsx';

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <ClippedDrawer />
      <Workspace />
    </Box>
  );
}
