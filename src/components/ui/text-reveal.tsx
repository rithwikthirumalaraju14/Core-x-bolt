import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  delay = 0,
  duration = 1000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "transition-all ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
        style={{ transitionDuration: `${duration}ms` }}
      >
        {text}
      </div>
    </div>
  );
};