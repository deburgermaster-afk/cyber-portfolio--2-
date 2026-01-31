import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Journey from '@/components/sections/Journey';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import ThemeToggle from '@/components/ThemeToggle';

export default function Portfolio() {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-magenta-500 to-cyan-500 z-50" 
           style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }} />

      {/* Theme toggle */}
      <div className="fixed top-6 right-6 z-40">
        <ThemeToggle theme={theme} onToggle={toggleTheme || (() => {})} />
      </div>

      {/* Main content */}
      <main className="relative">
        <Hero />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
      </main>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-magenta-500/5 opacity-30" />
      </div>
    </div>
  );
}
