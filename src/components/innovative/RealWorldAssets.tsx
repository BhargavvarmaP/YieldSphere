import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Gem, Briefcase, BarChart3 } from 'lucide-react';

interface AssetClass {
  name: string;
  icon: React.ReactNode;
  tvl: string;
  apy: string;
  minimumInvestment: string;
  lockupPeriod: string;
  properties: {
    label: string;
    value: string;
  }[];
}

const assetClasses: AssetClass[] = [
  {
    name: 'Real Estate',
    icon: <Building2 className="w-6 h-6 text-blue-600" />,
    tvl: '$45.2M',
    apy: '8.5%',
    minimumInvestment: '$5,000',
    lockupPeriod: '12 months',
    properties: [
      { label: 'Properties', value: '12' },
      { label: 'Occupancy Rate', value: '94%' },
      { label: 'Average Yield', value: '7.8%' },
    ],
  },
  {
    name: 'Precious Metals',
    icon: <Gem className="w-6 h-6 text-purple-600" />,
    tvl: '$28.7M',
    apy: '5.2%',
    minimumInvestment: '$1,000',
    lockupPeriod: '3 months',
    properties: [
      { label: 'Gold Allocation', value: '60%' },
      { label: 'Silver Allocation', value: '30%' },
      { label: 'Other Metals', value: '10%' },
    ],
  },
  {
    name: 'Private Equity',
    icon: <Briefcase className="w-6 h-6 text-green-600" />,
    tvl: '$32.1M',
    apy: '15.7%',
    minimumInvestment: '$10,000',
    lockupPeriod: '24 months',
    properties: [
      { label: 'Companies', value: '8' },
      { label: 'Sectors', value: '5' },
      { label: 'Avg. Company Value', value: '$4.0M' },
    ],
  },
];

export function RealWorldAssets() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-World Asset Tokenization</h2>
          <p className="text-gray-600 mt-1">Invest in tokenized traditional assets</p>
        </div>
        <BarChart3 className="w-6 h-6 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assetClasses.map((asset) => (
          <motion.div
            key={asset.name}
            className="bg-gray-50 rounded-lg p-6"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              {asset.icon}
              <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">TVL</p>
                  <p className="font-semibold text-gray-900">{asset.tvl}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">APY</p>
                  <p className="font-semibold text-green-600">{asset.apy}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Min. Investment</p>
                    <p className="font-semibold text-gray-900">{asset.minimumInvestment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lock-up Period</p>
                    <p className="font-semibold text-gray-900">{asset.lockupPeriod}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                {asset.properties.map((property) => (
                  <div key={property.label} className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{property.label}</span>
                    <span className="text-sm font-medium text-gray-900">{property.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              Invest Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}