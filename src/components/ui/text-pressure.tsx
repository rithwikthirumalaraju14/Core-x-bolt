import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextPressureProps {
  text: string;
  className?: string;
  pressureIntensity?: number;
}

export const TextPressure: React.FC<TextPressureProps> = ({
  text,
  className,
  pressureIntensity = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getCharacterStyle = (index: number, char: string) => {
    if (!containerRef.current) return {};

    const charElement = containerRef.current.children[index] as HTMLElement;
    if (!charElement) return {};

    const rect = charElement.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const charCenterX = rect.left - containerRect.left + rect.width / 2;
    const charCenterY = rect.top - containerRect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - charCenterX, 2) + 
      Math.pow(mousePosition.y - charCenterY, 2)
    );
    
    const maxDistance = 100;
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const pressure = (1 - normalizedDistance) * pressureIntensity;
    
    const scale = 1 + pressure * 0.5;
    const skew = pressure * 10;
    
    return {
      transform: `scale(${scale}) skew(${skew}deg)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  return (
    <div ref={containerRef} className={cn("inline-flex", className)}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block origin-center"
          style={getCharacterStyle(index, char)}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};