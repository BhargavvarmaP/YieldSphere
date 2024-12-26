import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const isWalletConnected = useAppSelector(state => state.wallet.isConnected);

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-700/30"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Revolutionize Your Investment Strategy with PLIF
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-200">
            Experience the future of portfolio management with our innovative liquidity investment framework.
            Maximize returns while maintaining optimal risk levels.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              {isWalletConnected ? 'Go to Dashboard' : 'Get Started'}
            </button>
            <button
              onClick={() => navigate('/innovative-strategies')}
              className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-3xl md:text-4xl font-bold">$1B+</p>
              <p className="text-gray-300">Total Value Locked</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">50K+</p>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">12%</p>
              <p className="text-gray-300">Average APY</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">24/7</p>
              <p className="text-gray-300">Active Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
