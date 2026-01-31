import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    year: '2026 - Present',
    title: 'Cybersecurity Intern',
    company: '(Confidential) Agency',
    description: 'Working on security operations and threat analysis in a confidential government agency.',
    color: 'from-red-500 to-pink-500',
  },
  {
    year: '2024 - Present',
    title: 'CEO',
    company: 'XeroxIt Aus',
    description: 'Leading XeroxIt Australia as CEO, managing operations and strategic growth in the tech sector.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    year: '2022 - 2023',
    title: 'Junior Developer',
    company: 'Softacun',
    description: 'Developed web applications and backend systems, gaining experience in full-stack development and software architecture.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    year: '2021 - 2022',
    title: 'Freelance Developer',
    company: 'Self-Employed',
    description: 'Built custom web solutions for clients, specializing in full-stack development and cybersecurity consulting.',
    color: 'from-green-500 to-emerald-500',
  },
];

export default function Journey() {
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
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full blur-3xl"
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
            My Journey
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            A timeline of my professional experience in cybersecurity and full-stack development.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="flex gap-8">
                {/* Timeline marker */}
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center text-white font-bold shadow-lg`}
                  >
                    {index + 1}
                  </motion.div>
                  {index < experiences.length - 1 && (
                    <div className="w-1 h-24 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {exp.title}
                        </h3>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold">
                        {exp.year}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
