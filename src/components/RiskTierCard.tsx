import React from 'react';
import { ArrowUpRight, Shield, Wallet } from 'lucide-react';
import type { RiskTier } from '../types';

interface RiskTierCardProps {
  tier: RiskTier;
  onInvest: () => void;
}

export function RiskTierCard({ tier, onInvest }: RiskTierCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
        <Shield className="w-6 h-6 text-blue-600" />
      </div>
      
      <p className="text-gray-600 mb-6">{tier.description}</p>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Stablecoins</span>
          <span className="font-medium">{tier.allocation.stablecoins}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Blue Chip</span>
          <span className="font-medium">{tier.allocation.blueChip}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Altcoins</span>
          <span className="font-medium">{tier.allocation.altcoins}%</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">Expected APY</p>
          <p className="text-2xl font-bold text-blue-600">{tier.apy}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Value Locked</p>
          <p className="text-lg font-semibold">{tier.tvl}</p>
        </div>
      </div>
      
      <button
        onClick={onInvest}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Wallet className="w-5 h-5" />
        Invest Now
        <ArrowUpRight className="w-5 h-5" />
      </button>
    </div>
  );
}