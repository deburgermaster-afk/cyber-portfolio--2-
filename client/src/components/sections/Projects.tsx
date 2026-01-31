import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const featuredProjects = [
  {
    title: 'OpinionsTracker',
    subtitle: 'WEB APP COMBO',
    price: '$5000',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'MobileTok',
    subtitle: 'Ecommerce Web',
    price: '$1800',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    title: 'UYHO',
    subtitle: 'Social Org Combo',
    price: '$4900',
    color: 'from-pink-500 to-rose-500',
  },
];

const projectStats = [
  { label: 'Finished Projects', value: 57, color: 'from-green-500 to-emerald-500' },
  { label: 'Live Projects', value: 33, color: 'from-blue-500 to-cyan-500' },
  { label: 'Client Terminated', value: 20, color: 'from-orange-500 to-red-500' },
];

const projectCategories = [
  { label: '7+ General Websites', icon: '🌐' },
  { label: '9 Android Apps', icon: '📱' },
  { label: '3 Custom Agents', icon: '🤖' },
  { label: '17 AI Integrations', icon: '⚡' },
  { label: '100+ Design Updates', icon: '🎨' },
];

export default function Projects() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 dark:from-purple-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-4">
            My Work
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            A showcase of completed projects and professional achievements across multiple domains.
          </p>
        </motion.div>

        {/* Project Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {projectStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-10 blur transition-all duration-300`} />
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 shadow-lg group-hover:shadow-2xl transition-all duration-300 text-center">
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Featured Projects
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl opacity-0 group-hover:opacity-10 blur transition-all duration-300`} />
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between">
                  {/* Header */}
                  <div className="mb-6">
                    <div className={`inline-block w-12 h-12 bg-gradient-to-br ${project.color} rounded-lg mb-4`} />
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className={`text-3xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                    {project.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Project Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Project Categories
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {projectCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {category.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
