import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserCircle, 
  LogIn, 
  LogOut, 
  Menu, 
  X, 
  Settings, 
  BookOpen 
} from 'lucide-react';

type AuthStatus = 'unauthenticated' | 'authenticated';

export const ProfessionalNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('unauthenticated');
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Features', 
      href: '/features', 
      icon: <BookOpen className="inline mr-2" size={16} /> 
    },
    { 
      name: 'Protocols', 
      href: '/protocols', 
      icon: <Settings className="inline mr-2" size={16} /> 
    }
  ];

  const handleAuthentication = () => {
    if (authStatus === 'unauthenticated') {
      // Simulate login flow
      setAuthStatus('authenticated');
      setUserProfile({
        name: 'DeFi Investor',
        email: 'investor@yieldsphere.com'
      });
    } else {
      // Logout
      setAuthStatus('unauthenticated');
      setUserProfile(null);
    }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/api/placeholder/100/40" 
              alt="YieldSphere Logo" 
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={link.href} 
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Authentication Section */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {authStatus === 'authenticated' ? (
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => navigate('/profile')}
                    className="flex items-center text-gray-300 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    <UserCircle className="mr-2" size={20} />
                    {userProfile?.name}
                  </motion.button>
                  <motion.button
                    onClick={handleAuthentication}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={handleAuthentication}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn className="mr-2" size={16} />
                  Login
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900/95 backdrop-blur-lg absolute w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 10 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link 
                    to={link.href} 
                    className="block text-gray-300 hover:text-white py-2 flex items-center"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Authentication */}
              <div className="mt-4">
                {authStatus === 'authenticated' ? (
                  <>
                    <div 
                      className="flex items-center text-white mb-4"
                      onClick={() => navigate('/profile')}
                    >
                      <UserCircle className="mr-2" size={20} />
                      {userProfile?.name}
                    </div>
                    <motion.button
                      onClick={handleAuthentication}
                      className="w-full bg-red-600 text-white px-4 py-3 rounded-lg flex items-center justify-center"
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={handleAuthentication}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center"
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogIn className="mr-2" size={16} />
                    Login
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};