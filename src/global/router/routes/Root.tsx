import { Outlet } from 'react-router-dom';

import Dashboard from '../../components/Dashboard';

export default function Root(): JSX.Element {

  return (
    <>
      <Dashboard />
      <Outlet />
    </>
  );

}