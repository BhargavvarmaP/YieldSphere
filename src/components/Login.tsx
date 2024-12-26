import React, { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export const Login: React.FC = () => {
  const { login, authenticated, ready } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (authenticated) {
      navigate(from, { replace: true });
    }
  }, [authenticated, navigate, from]);

  useEffect(() => {
    gsap.from('.login-form', { duration: 1, y: -50, opacity: 0 });
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    await login(); // Assuming `login` returns a promise, you can await it
    setIsLoading(false);
  };

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Welcome to PLIF</h2>
      <motion.div
        className="login-form w-full max-w-md space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={handleLogin}
          disabled={isLoading} // Use manually managed isLoading for the button state
          className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet or Email'}
        </motion.button>
        <p className="text-center text-sm text-gray-600">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};
