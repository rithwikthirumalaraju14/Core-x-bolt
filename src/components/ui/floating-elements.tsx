import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementsProps {
  className?: string;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-corex-red/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-6 h-6 bg-corex-blue/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-corex-green/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-60 left-1/3 w-5 h-5 bg-corex-orange/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-60 right-1/3 w-4 h-4 bg-corex-purple/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      
      {/* Floating lines */}
      <div className="absolute top-32 right-40 w-16 h-0.5 bg-gradient-to-r from-corex-red/20 to-transparent animate-pulse" />
      <div className="absolute bottom-32 left-40 w-20 h-0.5 bg-gradient-to-r from-corex-blue/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};