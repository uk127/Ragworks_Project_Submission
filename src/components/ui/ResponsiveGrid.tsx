'use client';

import { ReactNode } from 'react';

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6;

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    sm?: GridColumns;
    md?: GridColumns;
    lg?: GridColumns;
    xl?: GridColumns;
  };
  gap?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export default function ResponsiveGrid({
  children,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'medium',
  className = ''
}: ResponsiveGridProps) {
  // Map gap sizes to Tailwind classes
  const gapClasses = {
    none: 'gap-0',
    small: 'gap-2 sm:gap-3',
    medium: 'gap-4 sm:gap-6',
    large: 'gap-6 sm:gap-8'
  };

  // Map column counts to Tailwind grid-template-columns classes
  const getColClass = (cols: GridColumns) => {
    switch (cols) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-4';
      case 5: return 'grid-cols-5';
      case 6: return 'grid-cols-6';
      default: return 'grid-cols-1';
    }
  };

  // Build responsive column classes
  const colClasses = [
    'grid-cols-1',
    cols.sm ? `sm:${getColClass(cols.sm)}` : '',
    cols.md ? `md:${getColClass(cols.md)}` : '',
    cols.lg ? `lg:${getColClass(cols.lg)}` : '',
    cols.xl ? `xl:${getColClass(cols.xl)}` : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={`grid ${colClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}