import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  name: string;
  description: string;
  languages: string[];
  x: number;
  y: number;
  size: 'sm' | 'md' | 'lg';
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'OpinionsTracker',
    description: 'Social media analytics platform',
    languages: ['React', 'Node.js', 'PostgreSQL'],
    x: 12,
    y: 18,
    size: 'lg',
    color: 'cyan',
  },
  {
    id: 2,
    name: 'MobileTok',
    description: 'E-commerce mobile app',
    languages: ['React Native', 'Firebase'],
    x: 78,
    y: 12,
    size: 'lg',
    color: 'magenta',
  },
  {
    id: 3,
    name: 'UYHO',
    description: 'Social organization platform',
    languages: ['Next.js', 'MongoDB', 'AWS'],
    x: 45,
    y: 42,
    size: 'lg',
    color: 'cyan',
  },
  {
    id: 4,
    name: 'SecureVault',
    description: 'Password manager',
    languages: ['Python', 'Cryptography'],
    x: 22,
    y: 55,
    size: 'md',
    color: 'magenta',
  },
  {
    id: 5,
    name: 'NetScan Pro',
    description: 'Network security scanner',
    languages: ['Python', 'Nmap', 'SQLite'],
    x: 88,
    y: 48,
    size: 'md',
    color: 'cyan',
  },
  {
    id: 6,
    name: 'AI Assistant',
    description: 'Custom AI chatbot',
    languages: ['TypeScript', 'OpenAI', 'Redis'],
    x: 35,
    y: 72,
    size: 'md',
    color: 'magenta',
  },
  {
    id: 7,
    name: 'DataFlow',
    description: 'ETL pipeline tool',
    languages: ['Go', 'Kafka'],
    x: 68,
    y: 78,
    size: 'sm',
    color: 'cyan',
  },
  {
    id: 8,
    name: 'CloudDeploy',
    description: 'CI/CD automation',
    languages: ['Docker', 'Kubernetes'],
    x: 8,
    y: 82,
    size: 'sm',
    color: 'magenta',
  },
  {
    id: 9,
    name: 'ThreatDetect',
    description: 'Malware analysis tool',
    languages: ['C++', 'Assembly'],
    x: 58,
    y: 22,
    size: 'sm',
    color: 'cyan',
  },
  {
    id: 10,
    name: 'API Gateway',
    description: 'Microservices router',
    languages: ['Rust', 'gRPC'],
    x: 28,
    y: 32,
    size: 'sm',
    color: 'magenta',
  },
  {
    id: 11,
    name: 'LogMonitor',
    description: 'Real-time log analyzer',
    languages: ['Elasticsearch', 'Python'],
    x: 92,
    y: 28,
    size: 'sm',
    color: 'cyan',
  },
  {
    id: 12,
    name: 'BlockChain Wallet',
    description: 'Crypto wallet app',
    languages: ['Solidity', 'Web3.js'],
    x: 5,
    y: 42,
    size: 'sm',
    color: 'magenta',
  },
  {
    id: 13,
    name: 'SmartHome Hub',
    description: 'IoT device controller',
    languages: ['Python', 'MQTT', 'React'],
    x: 65,
    y: 58,
    size: 'md',
    color: 'cyan',
  },
  {
    id: 14,
    name: 'CyberShield',
    description: 'Firewall management system',
    languages: ['Go', 'eBPF', 'Linux'],
    x: 18,
    y: 88,
    size: 'sm',
    color: 'magenta',
  },
  {
    id: 15,
    name: 'MediaStream',
    description: 'Video streaming platform',
    languages: ['FFmpeg', 'Node.js', 'HLS'],
    x: 82,
    y: 68,
    size: 'md',
    color: 'cyan',
  },
  {
    id: 16,
    name: 'InventoryPro',
    description: 'Stock management system',
    languages: ['Laravel', 'MySQL', 'Vue'],
    x: 48,
    y: 88,
    size: 'sm',
    color: 'magenta',
  },
  {
    id: 17,
    name: 'VoiceAuth',
    description: 'Voice authentication API',
    languages: ['Python', 'TensorFlow', 'FastAPI'],
    x: 38,
    y: 8,
    size: 'sm',
    color: 'cyan',
  },
  {
    id: 18,
    name: 'DocuSign Clone',
    description: 'Digital signature platform',
    languages: ['React', 'Node.js', 'PDF.js'],
    x: 72,
    y: 35,
    size: 'sm',
    color: 'magenta',
  },
  {
    id: 19,
    name: 'GameLeaderboard',
    description: 'Real-time gaming stats',
    languages: ['Socket.io', 'Redis', 'React'],
    x: 55,
    y: 65,
    size: 'sm',
    color: 'cyan',
  },
  {
    id: 20,
    name: 'PaymentGateway',
    description: 'Secure payment processor',
    languages: ['Java', 'Spring', 'Stripe'],
    x: 15,
    y: 68,
    size: 'md',
    color: 'magenta',
  },
  {
    id: 21,
    name: 'HealthTracker',
    description: 'Fitness & health app',
    languages: ['Flutter', 'Firebase', 'HealthKit'],
    x: 88,
    y: 85,
    size: 'sm',
    color: 'cyan',
  },
  {
    id: 22,
    name: 'CodeReview Bot',
    description: 'Automated PR reviewer',
    languages: ['Python', 'GitHub API', 'OpenAI'],
    x: 25,
    y: 12,
    size: 'sm',
    color: 'magenta',
  },
];

// Generate connections between nearby projects
const generateConnections = (projects: Project[]) => {
  const connections: { from: Project; to: Project }[] = [];
  
  projects.forEach((p1, i) => {
    projects.forEach((p2, j) => {
      if (i < j) {
        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        );
        // Connect if within range
        if (distance < 40) {
          connections.push({ from: p1, to: p2 });
        }
      }
    });
  });
  
  return connections;
};

const connections = generateConnections(projects);

const ProjectNode = ({ project, isVisible }: { project: Project; isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };
  
  const glowSize = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };
  
  const colorClasses = {
    cyan: 'bg-cyan-400 shadow-cyan-400/50',
    magenta: 'bg-magenta-400 shadow-magenta-400/50',
  };
  
  const glowClasses = {
    cyan: 'bg-cyan-400/30',
    magenta: 'bg-magenta-400/30',
  };

  const textColorClasses = {
    cyan: 'text-cyan-600 dark:text-cyan-400',
    magenta: 'text-magenta-600 dark:text-magenta-400',
  };

  // Determine label position based on node position
  const labelPosition = project.x > 50 ? 'right' : 'left';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay: project.id * 0.05 }}
      className="absolute cursor-pointer group"
      style={{ left: `${project.x}%`, top: `${project.y}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.8 : 0.3 }}
        className={`absolute ${glowSize[project.size]} ${glowClasses[project.color as keyof typeof glowClasses]} rounded-full blur-md -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2`}
      />
      
      {/* Node */}
      <motion.div
        animate={{ scale: isHovered ? 1.3 : 1 }}
        className={`relative ${sizeClasses[project.size]} ${colorClasses[project.color as keyof typeof colorClasses]} rounded-full shadow-lg`}
      />
      
      {/* Project name label - always visible */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none ${
          labelPosition === 'left' ? 'right-full mr-2' : 'left-full ml-2'
        }`}
      >
        <span className={`text-xs font-mono ${textColorClasses[project.color as keyof typeof textColorClasses]} opacity-70 group-hover:opacity-100 transition-opacity`}>
          {project.name}
        </span>
      </div>
      
      {/* Pulse animation for large nodes */}
      {project.size === 'lg' && (
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute ${sizeClasses[project.size]} ${colorClasses[project.color as keyof typeof colorClasses]} rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2`}
        />
      )}
      
      {/* Tooltip on hover - shows full details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 pointer-events-none"
      >
        <div className="bg-slate-800 dark:bg-card border border-cyan-500/30 rounded-lg p-4 shadow-xl min-w-[200px] glow-box">
          <h4 className="text-white font-bold font-mono mb-1">{project.name}</h4>
          <p className="text-gray-300 dark:text-gray-400 text-xs mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.languages.map((lang, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-0.5 rounded-full ${
                  project.color === 'cyan' 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'bg-magenta-500/20 text-magenta-400'
                }`}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden bg-background">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-magenta-400 font-mono text-sm tracking-widest uppercase mb-4">
            {'> PROJECT NETWORK'}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white glow-text-bright mb-4">
            My Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-2">
            Explore the constellation of projects I've built. Hover over each node to discover more.
          </p>
          <p className="text-cyan-600 dark:text-cyan-400 text-sm font-mono animate-pulse">
            ✨ Click or hover on dots to view project details
          </p>
        </motion.div>

        {/* Spider Net / Constellation */}
        <div className="relative h-[600px] md:h-[700px] w-full">
          {/* SVG for connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((conn, index) => (
              <motion.line
                key={index}
                x1={`${conn.from.x}%`}
                y1={`${conn.from.y}%`}
                x2={`${conn.to.x}%`}
                y2={`${conn.to.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isVisible ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1, delay: index * 0.05 }}
              />
            ))}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#ff00ff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Project nodes */}
          {projects.map((project) => (
            <ProjectNode key={project.id} project={project} isVisible={isVisible} />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
            <span className="text-gray-700 dark:text-gray-400 font-mono text-sm">Major Project</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-magenta-400 rounded-full shadow-lg shadow-magenta-400/50" />
            <span className="text-gray-700 dark:text-gray-400 font-mono text-sm">Medium Project</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
            <span className="text-gray-700 dark:text-gray-400 font-mono text-sm">Small Project</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: '57+', label: 'Projects Completed' },
            { value: '33', label: 'Live & Running' },
            { value: '17', label: 'AI Integrations' },
            { value: '9', label: 'Mobile Apps' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-card border border-cyan-500/20 rounded-lg shadow-lg dark:glow-box">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 font-mono mb-1">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
