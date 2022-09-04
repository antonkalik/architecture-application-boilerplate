import { Outlet, useOutletContext } from 'react-router';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ element }) => {
  const session = useOutletContext();
  return session.data ? <Navigate to="/" replace /> : element || <Outlet />;
};
