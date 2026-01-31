import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function Typewriter({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      const typeChar = () => {
        if (charIndex < text.length) {
          setDisplayedText(text.substring(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typeChar, speed);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      };

      timeout = setTimeout(typeChar, delay);
    };

    startTyping();

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}
