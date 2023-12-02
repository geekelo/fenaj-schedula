import { Outlet } from 'react-router-dom';
import Navigation from './navigation';

function Layout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Layout;
