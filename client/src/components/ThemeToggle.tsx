import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  theme: string;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="icon"
      className="rounded-full border-cyan-500/50 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 glow-box"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
      ) : (
        <Moon className="h-4 w-4 text-blue-400" />
      )}
    </Button>
  );
}
