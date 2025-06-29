import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextTrailProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export const TextTrail: React.FC<TextTrailProps> = ({
  text,
  className,
  delay = 0,
  duration = 50
}) => {
  const [animatedText, setAnimatedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const animateText = () => {
      let currentIndex = 0;
      
      const addNextChar = () => {
        if (currentIndex < text.length) {
          setAnimatedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(addNextChar, duration);
        } else {
          // Hide cursor after animation completes
          setTimeout(() => setShowCursor(false), 1000);
        }
      };
      
      addNextChar();
    };

    timeoutId = setTimeout(animateText, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, delay, duration]);

  return (
    <span className={cn("inline-block", className)}>
      {animatedText}
      {showCursor && <span className="animate-pulse ml-1">|</span>}
    </span>
  );
};