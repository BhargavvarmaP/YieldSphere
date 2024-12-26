import React from 'react';
import { SettingsCard } from '../components/settings/SettingsCard';

export function Settings() {
  const [notifications, setNotifications] = React.useState(true);
  const [theme, setTheme] = React.useState('system');
  const [currency, setCurrency] = React.useState('USD');
  const [riskLevel, setRiskLevel] = React.useState('medium');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SettingsCard
            title="Notifications"
            description="Configure how you want to receive updates and alerts"
            options={[
              {
                label: "Enable Notifications",
                value: notifications,
                type: "toggle",
                onChange: setNotifications,
              },
            ]}
          />
          
          <SettingsCard
            title="Display"
            description="Customize your viewing experience"
            options={[
              {
                label: "Theme",
                value: theme,
                type: "select",
                options: ['light', 'dark', 'system'],
                onChange: setTheme,
              },
              {
                label: "Currency",
                value: currency,
                type: "select",
                options: ['USD', 'EUR', 'GBP', 'JPY'],
                onChange: setCurrency,
              },
            ]}
          />
          
          <SettingsCard
            title="Investment Preferences"
            description="Set your investment strategy and risk tolerance"
            options={[
              {
                label: "Risk Level",
                value: riskLevel,
                type: "select",
                options: ['low', 'medium', 'high'],
                onChange: setRiskLevel,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}