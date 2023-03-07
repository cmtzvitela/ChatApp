import React from 'react';
import { Outlet } from 'react-router-dom';
import PrimarySearchAppBar from '../components/WebsiteComponents/NavBar.jsx';

export default function PageLayout() {
  return (
    <div>
      <PrimarySearchAppBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
