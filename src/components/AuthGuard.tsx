import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { LoadingSpinner } from './LoadingSpinner';

export const AuthGuard: React.FC = () => {
  const { authenticated, ready } = usePrivy();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};