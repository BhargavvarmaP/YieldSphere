import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiHelpCircle, FiMessageCircle, FiBook, FiPhone } from 'react-icons/fi';

const HelpSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I connect my wallet?',
      answer: 'To connect your wallet, click the "Connect Wallet" button in the top right corner and select your preferred wallet provider. We currently support MetaMask, WalletConnect, and Coinbase Wallet.',
      category: 'Wallet',
    },
    {
      question: 'What are the investment minimums?',
      answer: 'Investment minimums vary by strategy. Conservative starts at $10,000, Balanced at $25,000, Growth at $50,000, and Aggressive at $100,000.',
      category: 'Investments',
    },
    {
      question: 'How are my assets secured?',
      answer: 'We implement industry-leading security measures including multi-signature wallets, cold storage, and regular security audits to ensure the safety of your assets.',
      category: 'Security',
    },
    {
      question: 'What are the fees?',
      answer: 'Our fee structure is transparent: 0.5% annual management fee and 10% performance fee on profits above the high water mark.',
      category: 'Fees',
    },
  ];

  const guides = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using PLIF platform',
      icon: <FiBook size={24} />,
    },
    {
      title: 'Investment Strategies',
      description: 'Understanding different investment approaches',
      icon: <FiHelpCircle size={24} />,
    },
    {
      title: 'Security Best Practices',
      description: 'Keep your account and assets safe',
      icon: <FiShield size={24} />,
    },
    {
      title: 'Platform Features',
      description: 'Explore all platform capabilities',
      icon: <FiLayout size={24} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 max-w-4xl mx-auto space-y-6"
    >
      {/* Search Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">How can we help you?</h1>
        <div className="max-w-xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Contact Support',
            description: '24/7 customer support',
            icon: <FiMessageCircle size={24} />,
            action: 'Chat Now',
          },
          {
            title: 'Documentation',
            description: 'Detailed platform guides',
            icon: <FiBook size={24} />,
            action: 'View Docs',
          },
          {
            title: 'Call Us',
            description: 'Speak with an expert',
            icon: <FiPhone size={24} />,
            action: 'Call Now',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              {item.action}
            </button>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
            >
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className="text-sm text-blue-600">{faq.category}</span>
              </button>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Help Guides */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Help Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex-shrink-0 text-blue-600">{guide.icon}</div>
              <div>
                <h3 className="font-medium text-gray-900">{guide.title}</h3>
                <p className="text-sm text-gray-500">{guide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900">Customer Support</h3>
            <p className="text-gray-600 mt-2">
              Available 24/7 via chat or email
              <br />
              Email: support@plif.com
              <br />
              Phone: +1 (800) 123-4567
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Business Hours</h3>
            <p className="text-gray-600 mt-2">
              Monday - Friday: 9:00 AM - 8:00 PM EST
              <br />
              Saturday: 10:00 AM - 6:00 PM EST
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelpSupport;
