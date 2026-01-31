import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 z-50 flex items-center justify-center overflow-hidden pointer-events-none"
    >
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

      {/* Loading content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Animated dots */}
        <div className="flex justify-center gap-3 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/50"
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            <span className="animate-pulse">limit</span>
            <span>...</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="text-2xl font-bold text-gray-800 dark:text-gray-200"
          >
            <span className="animate-pulse">loading</span>
            <span className="text-purple-600">...</span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: 'easeInOut' }}
            className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-full max-w-xs mx-auto shadow-lg shadow-purple-500/50"
          />
        </div>

        {/* System status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-sm text-gray-600 dark:text-gray-400 font-mono"
        >
          {'> INITIALIZING PORTFOLIO'}
        </motion.p>
      </div>
    </motion.div>
  );
}
