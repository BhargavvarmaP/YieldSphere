import React from 'react';
import { FaChartLine, FaShieldAlt, FaClock, FaRobot } from 'react-icons/fa';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <FaChartLine className="w-8 h-8 text-blue-600" />,
      title: 'Optimized Returns',
      description: 'Advanced algorithms maximize your investment returns while maintaining your desired risk level.',
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-blue-600" />,
      title: 'Enterprise-Grade Security',
      description: 'Multi-layer security protocols and regular audits ensure your investments are protected.',
    },
    {
      icon: <FaClock className="w-8 h-8 text-blue-600" />,
      title: 'Real-Time Monitoring',
      description: 'Track your portfolio performance and market changes in real-time with advanced analytics.',
    },
    {
      icon: <FaRobot className="w-8 h-8 text-blue-600" />,
      title: 'AI-Powered Strategies',
      description: 'Machine learning algorithms adapt to market conditions for optimal investment decisions.',
    },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose PLIF?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with proven investment strategies
            to deliver superior returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
