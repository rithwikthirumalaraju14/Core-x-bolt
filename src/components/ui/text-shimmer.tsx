import React from 'react';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
  duration?: number;
}

export const TextShimmer: React.FC<TextShimmerProps> = ({
  text,
  className,
  shimmerWidth = 100,
  duration = 2000
}) => {
  return (
    <div className={cn("relative inline-block overflow-hidden", className)}>
      <span className="relative z-10">{text}</span>
      <div
        className="absolute inset-0 -top-0 -left-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
        style={{
          width: `${shimmerWidth}%`,
          animationDuration: `${duration}ms`
        }}
      />
    </div>
  );
};