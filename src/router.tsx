import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import { BiometricAuth } from './components/innovative/BiometricAuth';
import { MultiFactorAuth } from './components/innovative/MultiFactorAuth';
import { SocialRecovery } from './components/innovative/SocialRecovery';
import { WalletConnect } from './components/innovative/WalletConnect';
import { AuthGuard } from './components/AuthGuard';
import { Login } from './components/Login';
import { NotFound } from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'auth',
        element: <AuthGuard><Outlet /></AuthGuard>,
        children: [
          {
            path: 'biometric',
            element: <BiometricAuth />,
          },
          {
            path: 'mfa',
            element: <MultiFactorAuth />,
          },
          {
            path: 'social-recovery',
            element: <SocialRecovery />,
          },
          {
            path: 'wallet',
            element: <WalletConnect />,
          },
        ],
      },
    ],
  },
]);
