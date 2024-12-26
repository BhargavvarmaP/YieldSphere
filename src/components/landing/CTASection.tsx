import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const isWalletConnected = useAppSelector(state => state.wallet.isConnected);

  return (
    <div className="bg-blue-600">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:py-20 md:px-12 lg:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Ready to Revolutionize Your Investment Strategy?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of investors who are already benefiting from our
              innovative portfolio management solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                {isWalletConnected ? 'Go to Dashboard' : 'Get Started'}
              </button>
              <button
                onClick={() => window.open('https://docs.plif.io', '_blank')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Read Documentation
              </button>
            </div>

            <p className="mt-8 text-sm text-blue-100">
              No credit card required. Get started in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
