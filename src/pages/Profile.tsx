import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiShield, FiCreditCard } from 'react-icons/fi';
import { useFormValidation } from '../hooks/useFormValidation';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');

  const profileForm = useFormValidation(
    {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      country: 'United States',
      timezone: 'UTC-5',
    },
    {
      fullName: (value) => !value ? 'Name is required' : undefined,
      email: (value) => !value ? 'Email is required' : !value.includes('@') ? 'Invalid email' : undefined,
      phone: (value) => !value ? 'Phone is required' : undefined,
    }
  );

  const securityForm = useFormValidation(
    {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: true,
    },
    {
      currentPassword: (value) => !value ? 'Current password is required' : undefined,
      newPassword: (value) => !value ? 'New password is required' : value.length < 8 ? 'Password must be at least 8 characters' : undefined,
      confirmPassword: (value) => !value ? 'Please confirm password' : undefined,
    }
  );

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'preferences', label: 'Preferences' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 max-w-4xl mx-auto space-y-6"
    >
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <FiUser size={40} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">John Doe</h1>
            <p className="text-gray-500">Premium Member</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm">
        <nav className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profileForm.values.fullName}
                      onChange={(e) => profileForm.handleChange('fullName', e.target.value)}
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={profileForm.values.email}
                      onChange={(e) => profileForm.handleChange('email', e.target.value)}
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={profileForm.values.phone}
                      onChange={(e) => profileForm.handleChange('phone', e.target.value)}
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <select
                    value={profileForm.values.country}
                    onChange={(e) => profileForm.handleChange('country', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={securityForm.values.currentPassword}
                        onChange={(e) => securityForm.handleChange('currentPassword', e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={securityForm.values.newPassword}
                        onChange={(e) => securityForm.handleChange('newPassword', e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={securityForm.values.confirmPassword}
                        onChange={(e) => securityForm.handleChange('confirmPassword', e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FiShield className="text-gray-400" size={24} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                <div className="mt-4 space-y-4">
                  {[
                    'Email notifications for trades',
                    'SMS alerts for price changes',
                    'Weekly portfolio summary',
                    'Market news digest',
                  ].map((item) => (
                    <div key={item} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-3 text-sm text-gray-700">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FiCreditCard className="text-gray-400" size={24} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">**** **** **** 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/24</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Edit</button>
                  </div>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <FiCreditCard />
                    <span>Add new payment method</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
