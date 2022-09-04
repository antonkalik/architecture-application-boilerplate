import { Outlet, useOutletContext } from 'react-router';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element }) => {
  const session = useOutletContext();
  return session.data ? (
    element || <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
