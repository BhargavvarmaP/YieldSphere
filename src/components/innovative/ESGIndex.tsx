import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Vote, Users, BarChart2 } from 'lucide-react';

interface ESGProject {
  name: string;
  category: 'Environmental' | 'Social' | 'Governance';
  impact: string;
  score: number;
  allocation: number;
  metrics: {
    label: string;
    value: string;
  }[];
  votes: number;
}

const esgProjects: ESGProject[] = [
  {
    name: 'Green Energy DeFi',
    category: 'Environmental',
    impact: 'Carbon Negative',
    score: 92,
    allocation: 35,
    metrics: [
      { label: 'Carbon Offset', value: '1,250 tons' },
      { label: 'Renewable Energy', value: '85%' },
      { label: 'Community Score', value: '9.2/10' },
    ],
    votes: 1547,
  },
  {
    name: 'DeFi Education Fund',
    category: 'Social',
    impact: 'High Social Impact',
    score: 88,
    allocation: 30,
    metrics: [
      { label: 'Students Reached', value: '25,000+' },
      { label: 'Countries', value: '45' },
      { label: 'Satisfaction', value: '4.8/5' },
    ],
    votes: 1285,
  },
  {
    name: 'DAO Governance Token',
    category: 'Governance',
    impact: 'Decentralized',
    score: 90,
    allocation: 35,
    metrics: [
      { label: 'Proposals', value: '156' },
      { label: 'Voter Turnout', value: '78%' },
      { label: 'Treasury', value: '$12.5M' },
    ],
    votes: 1892,
  },
];

export function ESGIndex() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ESG Impact Index</h2>
          <p className="text-gray-600 mt-1">Community-governed sustainable investments</p>
        </div>
        <Leaf className="w-6 h-6 text-green-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {esgProjects.map((project) => (
          <motion.div
            key={project.name}
            className="bg-gray-50 rounded-lg p-6"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              {project.category === 'Environmental' ? (
                <Leaf className="w-6 h-6 text-green-600" />
              ) : project.category === 'Social' ? (
                <Users className="w-6 h-6 text-blue-600" />
              ) : (
                <Vote className="w-6 h-6 text-purple-600" />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.category}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">ESG Score</span>
                  <span className="text-lg font-semibold text-green-600">{project.score}/100</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.score}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Impact Metrics</p>
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Vote className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{project.votes} votes</span>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    {project.allocation}% Allocation
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <motion.button
                className="bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                whileTap={{ scale: 0.98 }}
              >
                <Vote className="w-4 h-4" />
                Vote
              </motion.button>
              <motion.button
                className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                whileTap={{ scale: 0.98 }}
              >
                <BarChart2 className="w-4 h-4" />
                Invest
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}