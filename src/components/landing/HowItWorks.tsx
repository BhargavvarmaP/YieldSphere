import React from 'react';
import { FaWallet, FaChartPie, FaRegMoneyBillAlt } from 'react-icons/fa';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FaWallet className="w-12 h-12 text-blue-600" />,
      title: 'Connect Your Wallet',
      description: 'Start by connecting your Web3 wallet to access our platform securely.',
    },
    {
      icon: <FaChartPie className="w-12 h-12 text-blue-600" />,
      title: 'Choose Your Strategy',
      description: 'Select from our range of risk-optimized investment strategies.',
    },
    {
      icon: <FaRegMoneyBillAlt className="w-12 h-12 text-blue-600" />,
      title: 'Start Earning',
      description: 'Watch your portfolio grow with our automated investment strategies.',
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How PLIF Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with PLIF in three simple steps and begin your journey
            to smarter investing.
          </p>
        </div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-6 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
