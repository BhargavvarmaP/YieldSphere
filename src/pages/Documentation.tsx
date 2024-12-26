import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiSearch, FiChevronRight, FiExternalLink } from 'react-icons/fi';

const Documentation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      subsections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'quick-start', title: 'Quick Start Guide' },
        { id: 'installation', title: 'Installation' },
      ],
    },
    {
      id: 'features',
      title: 'Platform Features',
      subsections: [
        { id: 'portfolio-management', title: 'Portfolio Management' },
        { id: 'risk-analysis', title: 'Risk Analysis' },
        { id: 'market-data', title: 'Market Data' },
      ],
    },
    {
      id: 'api',
      title: 'API Reference',
      subsections: [
        { id: 'authentication', title: 'Authentication' },
        { id: 'endpoints', title: 'Endpoints' },
        { id: 'websockets', title: 'WebSocket API' },
      ],
    },
    {
      id: 'guides',
      title: 'Integration Guides',
      subsections: [
        { id: 'wallet-integration', title: 'Wallet Integration' },
        { id: 'custom-strategies', title: 'Custom Strategies' },
        { id: 'automation', title: 'Automation' },
      ],
    },
  ];

  const articles = {
    'getting-started': [
      {
        title: 'Welcome to PLIF',
        content: 'PLIF is a comprehensive portfolio liquidity investment framework...',
        readTime: '5 min read',
        lastUpdated: '2 days ago',
      },
      {
        title: 'System Requirements',
        content: 'Before you begin, ensure your system meets the following requirements...',
        readTime: '3 min read',
        lastUpdated: '1 week ago',
      },
    ],
    features: [
      {
        title: 'Portfolio Management Overview',
        content: 'Learn how to effectively manage your investment portfolio...',
        readTime: '10 min read',
        lastUpdated: '3 days ago',
      },
      {
        title: 'Risk Analysis Tools',
        content: 'Understand the various risk analysis tools available...',
        readTime: '8 min read',
        lastUpdated: '5 days ago',
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiBook size={24} className="text-blue-600" />
              <h1 className="text-2xl font-semibold text-gray-900">Documentation</h1>
            </div>
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docs..."
                className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {sections.map((section) => (
                <div key={section.id} className="space-y-1">
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                    <FiChevronRight
                      className={`transform transition-transform ${
                        activeSection === section.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {activeSection === section.id && (
                    <div className="ml-4 space-y-1">
                      {section.subsections.map((subsection) => (
                        <button
                          key={subsection.id}
                          className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                        >
                          {subsection.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {sections.find((s) => s.id === activeSection)?.title}
                </h2>
              </div>
              <div className="px-6 py-4">
                {articles[activeSection as keyof typeof articles]?.map((article, index) => (
                  <div
                    key={index}
                    className="mb-8 last:mb-0 pb-8 last:pb-0 border-b last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{article.readTime}</span>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{article.content}</p>
                    <div className="flex items-center space-x-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Read more
                      </button>
                      <button className="text-gray-500 hover:text-gray-600 text-sm font-medium flex items-center space-x-1">
                        <span>View on GitHub</span>
                        <FiExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Documentation;
