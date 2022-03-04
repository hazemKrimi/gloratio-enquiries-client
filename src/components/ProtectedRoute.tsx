// Packages
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

import { selectToken } from '../features/session/slice';

const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const location = useLocation();
  const token = useSelector(selectToken);

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
