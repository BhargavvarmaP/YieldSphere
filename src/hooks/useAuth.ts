import { usePrivy } from '@privy-io/react-auth';
import { useCallback } from 'react';

export const useAuth = () => {
  const {
    login,
    logout,
    authenticated,
    user,
    ready,
  } = usePrivy();

  const handleLogin = useCallback(async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [login]);

  return { authenticated, user, ready, handleLogin, logout };
};
