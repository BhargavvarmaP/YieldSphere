import React from 'react';
import { Shield } from 'lucide-react';

interface RiskIndicatorProps {
  level: 'Low' | 'Medium' | 'High';
  score?: number;
}

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({ level, score }) => {
  const getColorClass = () => {
    switch (level) {
      case 'Low': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'High': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Shield className={`w-5 h-5 ${getColorClass()}`} />
      <span className="font-medium">{level} Risk</span>
      {score !== undefined && (
        <span className="text-sm text-gray-500">({score})</span>
      )}
    </div>
  );
};