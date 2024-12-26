import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiTrendingUp, FiShield, FiPieChart } from 'react-icons/fi';
import { StatsCard } from '../components/cards/StatsCard';
import { useAppSelector } from '../hooks/useAppSelector';

const RiskAssessment: React.FC = () => {
  const portfolio = useAppSelector((state) => state.portfolio);

  const riskMetrics = [
    {
      title: 'Risk Score',
      value: portfolio.riskScore || 65,
      suffix: '/100',
      icon: <FiAlertTriangle size={24} />,
    },
    {
      title: 'Volatility',
      value: portfolio.volatility || 12.5,
      suffix: '%',
      icon: <FiTrendingUp size={24} />,
    },
    {
      title: 'Diversification',
      value: portfolio.diversificationScore || 78,
      suffix: '/100',
      icon: <FiPieChart size={24} />,
    },
    {
      title: 'Protection Level',
      value: portfolio.protectionLevel || 85,
      suffix: '/100',
      icon: <FiShield size={24} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric) => (
          <StatsCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Risk Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Your Risk Profile</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900">Risk Tolerance: Moderate</h3>
            <p className="text-blue-700 mt-1">
              Based on your investment history and preferences, you have a moderate risk tolerance.
              This suggests you can handle some market volatility while maintaining a balanced approach.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-900">Recommendations</h3>
            <ul className="list-disc list-inside text-green-700 mt-1 space-y-1">
              <li>Consider increasing portfolio diversification</li>
              <li>Maintain current risk level in new investments</li>
              <li>Review hedging strategies quarterly</li>
              <li>Monitor market volatility indicators</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Market Risk Factors</h2>
          <div className="space-y-4">
            {[
              { name: 'Market Volatility', value: 65 },
              { name: 'Interest Rate Risk', value: 45 },
              { name: 'Currency Risk', value: 30 },
              { name: 'Liquidity Risk', value: 25 },
            ].map((factor) => (
              <div key={factor.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">{factor.name}</span>
                  <span className="text-gray-900 font-medium">{factor.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${factor.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Risk Mitigation Strategies</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Diversification',
                description: 'Spread investments across multiple asset classes',
                status: 'Implemented',
                statusColor: 'text-green-600',
              },
              {
                title: 'Stop-Loss Orders',
                description: 'Automatic sell orders to limit potential losses',
                status: 'Recommended',
                statusColor: 'text-yellow-600',
              },
              {
                title: 'Hedging',
                description: 'Use of derivatives to protect against market risks',
                status: 'In Progress',
                statusColor: 'text-blue-600',
              },
              {
                title: 'Regular Rebalancing',
                description: 'Maintain target allocation through periodic adjustments',
                status: 'Implemented',
                statusColor: 'text-green-600',
              },
            ].map((strategy) => (
              <div
                key={strategy.title}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <h3 className="font-medium text-gray-900">{strategy.title}</h3>
                <p className="text-gray-600 text-sm">{strategy.description}</p>
                <span className={`text-sm font-medium ${strategy.statusColor}`}>
                  {strategy.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskAssessment;
