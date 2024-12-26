import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

interface SettingOption {
  label: string;
  value: string | boolean;
  type: 'toggle' | 'select';
  options?: string[];
  onChange: (value: any) => void;
}

interface SettingsCardProps {
  title: string;
  description: string;
  options: SettingOption[];
}

export function SettingsCard({ title, description, options }: SettingsCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="space-y-6">
        {options.map((option) => (
          <div key={option.label} className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {option.label}
            </label>
            {option.type === 'toggle' ? (
              <button
                onClick={() => option.onChange(!option.value)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  option.value ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    option.value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            ) : (
              <select
                value={option.value as string}
                onChange={(e) => option.onChange(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                {option.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}