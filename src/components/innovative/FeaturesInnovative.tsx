import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, ChartBar, Lock, Coins, Settings } from 'lucide-react';
import gsap from 'gsap';

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Military-grade encryption and multi-layer protection to ensure your assets are safe. Our security protocols are continuously audited and updated to meet the highest standards.',
    gradient: 'from-blue-500 to-purple-500',
    rotation: -15
  },
  {
    icon: Zap,
    title: 'Instant Execution',
    description: 'Lightning-fast transactions with minimal latency, allowing you to capitalize on market opportunities in real-time.',
    gradient: 'from-purple-500 to-pink-500',
    rotation: 0
  },
  {
    icon: ChartBar,
    title: 'AI Analytics',
    description: 'Predictive insights powered by machine learning to help you make informed investment decisions based on market trends.',
    gradient: 'from-pink-500 to-red-500',
    rotation: 15
  },
  {
    icon: Lock,
    title: 'Risk Management',
    description: 'Advanced algorithms for optimal risk assessment, ensuring that your investments are protected against market volatility.',
    gradient: 'from-red-500 to-orange-500',
    rotation: -15
  },
  {
    icon: Coins,
    title: 'Yield Optimization',
    description: 'Smart contract automation for maximum returns, allowing you to earn more with less effort.',
    gradient: 'from-orange-500 to-yellow-500',
    rotation: 0
  },
  {
    icon: Settings,
    title: 'Custom Strategies',
    description: 'Tailored solutions for your investment goals, enabling you to create a personalized portfolio that fits your needs.',
    gradient: 'from-yellow-500 to-green-500',
    rotation: 15
  }
];

export function FeaturesInnovative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.feature-card');
      
      cards.forEach((card) => {
        // Create hover effect
        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          gsap.to(card, {
            rotateX,
            rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000
          });

          // Add glow effect
          const glow = card.querySelector('.glow-effect');
          if (glow) {
            gsap.to(glow, {
              opacity: 1,
              x: x - 50,
              y: y - 50,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        };

        // Reset on mouse leave
        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
          });

          const glow = card.querySelector('.glow-effect');
          if (glow) {
            gsap.to(glow, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative py-32 overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-pulse animation-delay-2000" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-30 animate-pulse" />
            <h2 className="relative text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Revolutionary Features
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-gray-400"
          >
            Experience the next generation of DeFi technology
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, rotate: feature.rotation }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                rotate: { duration: 0.8, type: "spring" }
              }}
              className="feature-card relative group perspective"
            >
              {/* 3D Card */}
              <div className="relative preserve-3d transition-transform duration-500 group-hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <div className="relative p-8 rounded-2xl bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 overflow-hidden">
                  {/* Glow Effect */}
                  <div className="glow-effect absolute w-32 h-32 bg-white/20 rounded-full filter blur-2xl opacity-0 pointer-events-none" />

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-2.5 mb-6 relative`}>
                    <feature.icon className="w-full h-full text-white relative z-10" />
                    <div className="absolute inset-0 bg-black/20 rounded-xl backdrop-blur-sm" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-4 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 relative z-10">
                    {feature.description}
                  </p>

                  {/* Interactive Elements */}
                  <div className="absolute -right-2 -bottom-2 w-24 h-24 bg-gradient-to-r from-transparent to-white/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
