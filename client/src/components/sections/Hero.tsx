import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Server, Palette, Network } from 'lucide-react';
import Typewriter from '@/components/Typewriter';

// React icon
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)" />
  </svg>
);

// Flutter icon
const FlutterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
  </svg>
);

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20 bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-300/20 to-blue-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative z-10 container mx-auto px-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold">
                  Welcome to my digital space
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 dark:from-purple-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent"
              >
                {showContent ? (
                  <>
                    Full Stack <br />
                    Dev
                  </>
                ) : (
                  <Typewriter
                    text="Full Stack Dev"
                    speed={80}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 dark:from-purple-300 dark:via-blue-300 dark:to-purple-300"
                  />
                )}
              </motion.h1>

              {showContent && (
                <>
                  <motion.p
                    variants={itemVariants}
                    className="text-lg font-semibold text-purple-600 dark:text-purple-400"
                  >
                    BSC- KIT | CISCO NET AC. | MELB, AUS
                  </motion.p>
                  
                  {/* Tech icons row */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3 flex-wrap"
                  >
                    <div className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400" title="Web Development">
                      <Globe size={16} />
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400" title="Cross Platform Apps">
                      <Smartphone size={16} />
                    </div>
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400" title="Backend Development">
                      <Server size={16} />
                    </div>
                    <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400" title="Design">
                      <Palette size={16} />
                    </div>
                    <div className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400" title="React">
                      <ReactIcon />
                    </div>
                    <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400" title="Flutter">
                      <FlutterIcon />
                    </div>
                    <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400" title="Network">
                      <Network size={16} />
                    </div>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 rounded">
                      256-bit Military Grade Security
                    </span>
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    className="text-xl text-gray-700 dark:text-gray-300 max-w-lg leading-relaxed font-light"
                  >
                    Building secure systems and crafting elegant code. Specialized in cybersecurity, network analysis, and full-stack development.
                  </motion.p>
                </>
              )}
            </div>

            {showContent && (
              <>
                <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                  <a
                    href="#projects"
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                  >
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className="px-8 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-bold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                  >
                    Get In Touch
                  </a>
                </motion.div>


              </>
            )}
          </motion.div>

          {/* Right content - Profile image */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 lg:h-full flex flex-col items-center justify-center"
          >
            <div className="relative w-72 h-96 lg:w-80 lg:h-96">
              {/* Glowing gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 rounded-2xl opacity-75 blur-xl"
              />

              {/* Image container */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating accent elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-2xl opacity-50"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-50"
              />
            </div>

            {/* Name with typewriter animation */}
            {showContent && (
              <motion.div
                variants={itemVariants}
                className="mt-8 text-center"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 dark:from-purple-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
                  <Typewriter
                    text="Istiak Ahmed"
                    speed={100}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 dark:from-purple-300 dark:via-blue-300 dark:to-purple-300"
                  />
                </h2>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {showContent && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-purple-600 dark:text-purple-400"
        >
          <div className="text-center">
            <div className="text-xs font-semibold mb-2">SCROLL TO EXPLORE</div>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      )}
    </section>
  );
}
