import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

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
          <h2 className="text-4xl lg:text-5xl font-bold text-white glow-text-bright mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss cybersecurity? Reach out via email.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="max-w-md w-full"
          >
            <a
              href="mailto:istiak.ahmed.tj@gmail.com"
              className="flex items-center justify-center gap-4 p-6 bg-card border border-cyan-500/30 rounded-lg hover:border-cyan-500 transition-all duration-300 group glow-box hover:glow-box-bright"
            >
              <Mail size={24} className="text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="block text-sm font-mono text-cyan-400 mb-1">Email Me</span>
                <span className="text-white font-mono">istiak.ahmed.tj@gmail.com</span>
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
          <p className="mt-2">© 2024 Cybersecurity Portfolio. All systems secured.</p>
        </motion.div>
      </div>
    </section>
  );
}
