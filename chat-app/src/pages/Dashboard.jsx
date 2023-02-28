import PrimarySearchAppBar from '../components/DashboardComponents/DashboardNavBar.jsx';
import ClippedDrawer from '../components/DashboardComponents/DashboardSideBar.jsx';

export default function Dashboard() {
  return (
    <div>
      <PrimarySearchAppBar />
      <ClippedDrawer />
    </div>
  );
}
