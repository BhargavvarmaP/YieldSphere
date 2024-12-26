import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RiskTiers: React.FC = () => {
  const navigate = useNavigate();
  
  const tiers = [
    {
      name: 'Conservative',
      description: 'Stable returns with minimal risk',
      apy: '8-12%',
      allocation: {
        stablecoins: '70%',
        bluechip: '20%',
        defi: '10%',
      },
      features: [
        'High stablecoin allocation',
        'Focus on capital preservation',
        'Lower but consistent returns',
        'Minimal exposure to market volatility',
      ],
      color: 'blue',
    },
    {
      name: 'Balanced',
      description: 'Optimal risk-reward ratio',
      apy: '12-20%',
      allocation: {
        stablecoins: '50%',
        bluechip: '30%',
        defi: '20%',
      },
      features: [
        'Balanced asset allocation',
        'Moderate market exposure',
        'Higher potential returns',
        'Active risk management',
      ],
      color: 'indigo',
      featured: true,
    },
    {
      name: 'Growth',
      description: 'Maximum growth potential',
      apy: '20-30%',
      allocation: {
        stablecoins: '30%',
        bluechip: '40%',
        defi: '30%',
      },
      features: [
        'Higher risk tolerance',
        'Maximum growth potential',
        'Active portfolio management',
        'Strategic market positioning',
      ],
      color: 'purple',
    },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Investment Tiers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the investment strategy that best matches your risk tolerance
            and financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden
                ${tier.featured ? 'ring-2 ring-blue-500 transform scale-105' : ''}
              `}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                
                <div className="mb-6">
                  <p className="text-4xl font-bold text-blue-600">
                    {tier.apy}
                  </p>
                  <p className="text-gray-600">Expected APY</p>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold mb-2">Asset Allocation</h4>
                  <div className="space-y-2">
                    {Object.entries(tier.allocation).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="mb-8 space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/dashboard')}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white
                    ${tier.featured ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'}
                    transition-colors
                  `}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
