import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
};
