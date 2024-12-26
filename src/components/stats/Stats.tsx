import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { TrendingUp, Users, Database, Shield } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: 250,
    prefix: '$',
    suffix: 'M+',
    label: 'Total Value Locked',
    description: 'in DeFi protocols',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Active Users',
    description: 'globally and growing',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Database,
    value: 15,
    suffix: '+',
    label: 'DeFi Protocols',
    description: 'integrated and optimized',
    gradient: 'from-pink-500 to-red-500'
  },
  {
    icon: Shield,
    value: 99.99,
    suffix: '%',
    label: 'Security Rating',
    description: 'by leading auditors',
    gradient: 'from-red-500 to-orange-500'
  }
];

export function Stats() {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Our Impact in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-gray-400"
          >
            Leading the DeFi revolution with proven results
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur`} />
              <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} p-2.5 mb-6`}>
                  <stat.icon className="w-full h-full text-white" />
                </div>
                
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-white">
                    {stat.prefix}
                  </span>
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.value % 1 === 0 ? 0 : 2}
                    separator=","
                    className="text-4xl font-bold text-white"
                  />
                  <span className="text-3xl font-bold text-white">
                    {stat.suffix}
                  </span>
                </div>
                
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-white">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
