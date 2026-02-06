import { motion } from 'framer-motion';
import { Globe, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// React icon (simple custom SVG)
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
  </svg>
);

// Flutter icon (simple custom SVG)
const FlutterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
  </svg>
);

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-magenta-400 font-mono text-sm tracking-widest uppercase mb-4">
            {'> CONTACT'}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white glow-text-bright mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss cybersecurity? Reach out via email or my company.
          </p>
        </motion.div>

        <div className="flex flex-row justify-center items-center gap-4">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <a
              href="mailto:thetj.dev@gmail.com"
              className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-card border border-cyan-500/30 rounded-lg hover:border-cyan-500 transition-all duration-300 group shadow-lg dark:glow-box hover:shadow-xl dark:hover:glow-box-bright"
            >
              <Mail size={20} className="text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="block text-xs font-mono text-cyan-600 dark:text-cyan-400">Email Me</span>
                <span className="text-gray-900 dark:text-white font-mono text-sm">thetj.dev@gmail.com</span>
              </div>
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <a
              href="https://xeroxit.net"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-card border border-magenta-500/30 rounded-lg hover:border-magenta-500 transition-all duration-300 group shadow-lg dark:glow-box hover:shadow-xl dark:hover:glow-box-bright"
            >
              <Globe size={20} className="text-magenta-600 dark:text-magenta-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="block text-xs font-mono text-magenta-600 dark:text-magenta-400">My Company</span>
                <span className="text-gray-900 dark:text-white font-mono text-sm">xeroxit.net</span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 pt-8 border-t border-cyan-500/20 text-center text-gray-500 font-mono text-sm"
        >
          <p>{'> SYSTEM STATUS: OPERATIONAL'}</p>
          <p className="mt-2">© Istiak Ahmed. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}
