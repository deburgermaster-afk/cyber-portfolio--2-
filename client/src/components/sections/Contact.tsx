import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', url: '#', color: 'hover:text-cyan-400' },
  { icon: Linkedin, label: 'LinkedIn', url: '#', color: 'hover:text-blue-400' },
  { icon: Twitter, label: 'Twitter', url: '#', color: 'hover:text-cyan-300' },
  { icon: Mail, label: 'Email', url: 'mailto:contact@example.com', color: 'hover:text-magenta-400' },
];

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

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
            {'> CONTACT & CONNECT'}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white glow-text-bright mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss cybersecurity? Reach out and let's create something amazing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-mono text-cyan-400 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-card border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all duration-300 glow-box focus:glow-box-bright"
                  placeholder="Your name"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-mono text-cyan-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-card border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all duration-300 glow-box focus:glow-box-bright"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-mono text-cyan-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-card border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all duration-300 glow-box focus:glow-box-bright resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                className="w-full py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all duration-300 glow-box hover:glow-box-bright"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Social links and info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* Quick info */}
            <motion.div variants={itemVariants} className="bg-card border border-magenta-500/30 rounded-lg p-8 glow-box">
              <h3 className="text-xl font-bold text-magenta-400 mb-4 font-mono">Quick Info</h3>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center gap-3">
                  <span className="text-cyan-400">▸</span>
                  Available for freelance projects and full-time roles
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-cyan-400">▸</span>
                  Specialized in cybersecurity and secure development
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-cyan-400">▸</span>
                  Based in [Your Location] • Remote-friendly
                </p>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="bg-card border border-cyan-500/30 rounded-lg p-8 glow-box">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 font-mono">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 bg-background border border-cyan-500/30 rounded-lg hover:border-cyan-500 transition-all duration-300 group glow-box hover:glow-box-bright ${link.color}`}
                    >
                      <Icon size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-mono">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* GitHub activity */}
            <motion.div variants={itemVariants} className="bg-card border border-magenta-500/30 rounded-lg p-8 glow-box">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-magenta-400 font-mono">GitHub Activity</h3>
                <ExternalLink size={16} className="text-magenta-400" />
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📊 Contributions this year: 500+</p>
                <p>⭐ Popular repositories: 50+</p>
                <p>🔗 Open source contributor</p>
              </div>
            </motion.div>
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
