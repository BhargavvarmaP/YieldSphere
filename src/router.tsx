import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthGuard } from './components/AuthGuard';
import { Login } from './components/Login';
import { NotFound } from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { InnovativeStrategies } from './pages/InnovativeStrategies';
import Portfolio from './pages/Portfolio';
import RiskAssessment from './pages/RiskAssessment';
import MarketOverview from './pages/MarketOverview';
import Documentation from './pages/Documentation';
import HelpSupport from './pages/HelpSupport';
import InvestmentStrategies from './pages/InvestmentStrategies';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      // Protected Routes
      {
        element: <AuthGuard />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'analytics',
            element: <Analytics />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'portfolio',
            element: <Portfolio />,
          },
          {
            path: 'risk-assessment',
            element: <RiskAssessment />,
          },
          {
            path: 'market',
            element: <MarketOverview />,
          },
          {
            path: 'strategies',
            element: <InvestmentStrategies />,
          },
          {
            path: 'innovative-strategies',
            element: <InnovativeStrategies />,
          },
          {
            path: 'documentation',
            element: <Documentation />,
          },
          {
            path: 'help',
            element: <HelpSupport />,
          },
        ],
      },
    ],
  },
]);