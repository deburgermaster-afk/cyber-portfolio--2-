import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Wireshark', category: 'Network', icon: '🔍', color: 'from-blue-400 to-cyan-400' },
  { name: 'Node.js', category: 'Backend', icon: '⚡', color: 'from-green-400 to-emerald-400' },
  { name: 'Flutter', category: 'Mobile', icon: '📱', color: 'from-blue-500 to-blue-400' },
  { name: 'Python', category: 'Programming', icon: '🐍', color: 'from-yellow-400 to-orange-400' },
  { name: 'Java', category: 'Programming', icon: '☕', color: 'from-orange-400 to-red-400' },
  { name: 'Laravel', category: 'Framework', icon: '🚀', color: 'from-red-400 to-pink-400' },
  { name: 'React', category: 'Frontend', icon: '⚛️', color: 'from-cyan-400 to-blue-400' },
  { name: 'TypeScript', category: 'Programming', icon: '📘', color: 'from-blue-600 to-blue-400' },
  { name: 'Docker', category: 'DevOps', icon: '🐳', color: 'from-blue-500 to-cyan-500' },
  { name: 'Kubernetes', category: 'DevOps', icon: '☸️', color: 'from-blue-600 to-blue-500' },
  { name: 'Metasploit', category: 'Security', icon: '🎯', color: 'from-red-500 to-pink-500' },
  { name: 'Burp Suite', category: 'Security', icon: '🔐', color: 'from-orange-500 to-red-500' },
];

export default function Skills() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 -left-1/3 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/3 -right-1/3 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 dark:from-purple-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            A comprehensive collection of technologies I've mastered through hands-on experience in cybersecurity, network analysis, and full-stack development.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300`} />
              
              <div className="relative bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 group-hover:border-transparent transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                  {skill.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {skill.category}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Description sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-blue-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">Security & Network</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Proficient in network analysis with Wireshark, penetration testing using Metasploit, and web application security with Burp Suite. I conduct comprehensive security audits for enterprise environments.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-purple-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-4">Backend & DevOps</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Experienced in building scalable backend systems with Node.js and Python, containerization with Docker, and orchestration with Kubernetes for production-ready infrastructure.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-green-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-4">Frontend & Mobile</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Skilled in modern frontend development with React and TypeScript, creating responsive user interfaces. Also experienced in cross-platform mobile development using Flutter.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-orange-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-300 mb-4">Frameworks & Tools</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Proficient with Laravel for robust web applications, Docker for containerization, and a comprehensive toolkit of security and development utilities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
