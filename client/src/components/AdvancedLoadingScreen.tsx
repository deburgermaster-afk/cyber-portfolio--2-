import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VisitorInfo {
  ip: string;
  country: string;
  city: string;
  region: string;
  isp: string;
  speed: string;
  connectionType: string;
}

interface AdvancedLoadingScreenProps {
  onComplete?: () => void;
}

const TerminalLine = ({ text, delay, color = 'text-green-400' }: { text: string; delay: number; color?: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < text.length) {
        setDisplayedText(text.substring(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(typeChar, 30);
      }
    };

    timeout = setTimeout(typeChar, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <div className={`font-mono text-sm ${color} whitespace-pre-wrap break-words`}>
      {displayedText}
      {displayedText.length < text.length && <span className="animate-pulse">_</span>}
    </div>
  );
};

// Fetch visitor info directly from public APIs (client-side)
async function fetchVisitorInfo(): Promise<VisitorInfo> {
  const providers = [
    // Provider 1: ip-api.com
    async () => {
      const response = await fetch('http://ip-api.com/json/?fields=status,query,country,city,regionName,isp', {
        signal: AbortSignal.timeout(5000),
      });
      const data = await response.json();
      if (data.status === 'success') {
        return {
          ip: data.query,
          country: data.country,
          city: data.city,
          region: data.regionName,
          isp: data.isp,
        };
      }
      throw new Error('API returned non-success status');
    },
    // Provider 2: ipapi.co
    async () => {
      const response = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(5000),
      });
      const data = await response.json();
      return {
        ip: data.ip,
        country: data.country_name,
        city: data.city,
        region: data.region,
        isp: data.org || 'Unknown',
      };
    },
    // Provider 3: ipwhois.io
    async () => {
      const response = await fetch('https://ipwho.is/', {
        signal: AbortSignal.timeout(5000),
      });
      const data = await response.json();
      if (data.success) {
        return {
          ip: data.ip,
          country: data.country,
          city: data.city,
          region: data.region,
          isp: data.connection?.isp || 'Unknown',
        };
      }
      throw new Error('API returned non-success status');
    },
  ];

  // Try each provider
  for (const provider of providers) {
    try {
      const result = await provider();
      
      // Get network info
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const effectiveType = connection?.effectiveType || 'unknown';
      const downlink = connection?.downlink;
      
      return {
        ...result,
        speed: typeof downlink === 'number' ? `${downlink} Mbps` : 'N/A',
        connectionType: effectiveType,
      };
    } catch (error) {
      console.warn('Geolocation provider failed:', error);
      continue;
    }
  }

  // Fallback
  return {
    ip: 'Unknown',
    country: 'Unknown',
    city: 'Unknown',
    region: 'Unknown',
    isp: 'Unknown',
    speed: 'N/A',
    connectionType: 'unknown',
  };
}

export default function AdvancedLoadingScreen({ onComplete }: AdvancedLoadingScreenProps) {
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch visitor info from public API
    fetchVisitorInfo().then((info) => {
      setVisitorInfo(info);
      setLoading(false);

      // Auto-complete after showing info
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        onComplete?.();
      }, 6000);

      return () => clearTimeout(completeTimer);
    });
  }, [onComplete]);

  // Fallback timeout in case data doesn't load
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setIsComplete(true);
        onComplete?.();
      }
    }, 8000);

    return () => clearTimeout(fallbackTimer);
  }, [loading, onComplete]);

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

      {/* Terminal content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/80 dark:bg-black/90 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30 shadow-2xl"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-purple-500/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 text-sm font-mono ml-4">portfolio.terminal</span>
          </div>

          {/* Terminal content */}
          <div className="space-y-3 font-mono text-sm">
            {/* Initial greeting */}
            <TerminalLine text="$ initializing_profile.sh" delay={0} color="text-cyan-400" />
            <TerminalLine text="$ connecting to visitor network..." delay={200} color="text-green-400" />

            {/* Loading state */}
            {loading && (
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <div className="text-purple-400 font-mono text-sm">⟳ Fetching geolocation data...</div>
              </motion.div>
            )}

            {/* Visitor info */}
            {visitorInfo && !loading && (
              <>
                <TerminalLine text="" delay={600} />
                <TerminalLine text="$ visitor_profile --verbose" delay={800} color="text-cyan-400" />
                <TerminalLine text="" delay={900} />

                {/* Greeting */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                  <div className="text-purple-300 font-bold text-base">
                    Hello! How are you? 👋
                  </div>
                </motion.div>

                <TerminalLine text="" delay={1200} />

                {/* Connection info */}
                <TerminalLine
                  text={`├─ Client: ${visitorInfo.city}, ${visitorInfo.country}`}
                  delay={1400}
                  color="text-green-400"
                />
                <TerminalLine
                  text={`├─ IP Address: ${visitorInfo.ip}`}
                  delay={1600}
                  color="text-green-400"
                />
                <TerminalLine
                  text={`├─ Region: ${visitorInfo.region}`}
                  delay={1800}
                  color="text-green-400"
                />
                <TerminalLine
                  text={`├─ ISP: ${visitorInfo.isp}`}
                  delay={2000}
                  color="text-green-400"
                />
                <TerminalLine
                  text={`├─ Connection: ${visitorInfo.connectionType.toUpperCase()}`}
                  delay={2200}
                  color="text-green-400"
                />
                <TerminalLine
                  text={`└─ Speed: ${visitorInfo.speed}`}
                  delay={2400}
                  color="text-green-400"
                />

                <TerminalLine text="" delay={2600} />
                <TerminalLine text="$ Status: CONNECTED ✓" delay={2800} color="text-green-500" />
                <TerminalLine text="$ Loading portfolio..." delay={3000} color="text-cyan-400" />

                {/* Progress bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 3.2, ease: 'easeInOut' }}
                  className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-full mt-4"
                />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
