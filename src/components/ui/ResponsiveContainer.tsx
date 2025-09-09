'use client';

import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ResponsiveContainer({ children, className = '' }: ResponsiveContainerProps) {
  return (
    <div className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 mx-auto ${className}`}>
      {children}
    </div>
  );
}