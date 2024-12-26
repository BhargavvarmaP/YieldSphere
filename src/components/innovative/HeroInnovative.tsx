import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../common/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ 
      y: [20, -20, 20],
      opacity: 1,
    }}
    transition={{
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      },
      opacity: {
        duration: 1
      }
    }}
    className="absolute"
  >
    {children}
  </motion.div>
);

export function HeroInnovative() {
  const { login, authenticated } = usePrivy();
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const yText = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    if (sphereRef.current) {
      const sphere = sphereRef.current;
      
      // Create floating particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-white rounded-full';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        sphere.appendChild(particle);

        gsap.to(particle, {
          x: 'random(-50, 50)',
          y: 'random(-50, 50)',
          opacity: 0,
          duration: 'random(1, 3)',
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // Rotate sphere
      gsap.to(sphere, {
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black perspective-1000">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-gray-900 to-black" />
        <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-screen filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-screen filter blur-[128px] animate-pulse animation-delay-2000" />
      </div>

      {/* Interactive 3D Sphere */}
      <div 
        ref={sphereRef}
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] preserve-3d"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-3xl" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingCard delay={0}>
          <div className="absolute top-[20%] left-[20%] p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white/80">Smart Contracts</span>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard delay={1}>
          <div className="absolute top-[40%] right-[15%] p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-white/80">Lightning Fast</span>
            </div>
          </div>
        </FloatingCard>
      </div>

      {/* Content */}
      <motion.div 
        ref={containerRef}
        style={{ y: yText, opacity: opacityText, scale }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
              The Future of DeFi
            </span>
            <br />
            <span className="text-white mt-2">
              Is Here
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            Experience the next generation of decentralized finance with our 
            revolutionary yield optimization platform. Our platform offers advanced algorithms and risk management tools to help you maximize your returns while minimizing exposure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            {!authenticated && (
              <Button
                onClick={() => login()}
                className="group relative px-8 py-4 text-lg font-semibold overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-transform duration-300" />
              </Button>
            )}
            <Button
              variant="outline"
              className="group px-8 py-4 text-lg font-semibold rounded-xl border-2 border-purple-500/50 hover:border-purple-400 transition-colors duration-300"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 group-hover:from-blue-300 group-hover:to-purple-300">
                Learn More
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
