'use client';

import {ReactNode} from 'react';
import {HTMLAttributes} from 'react';
interface CardProps extends HTMLAttributes<HTMLDivElement>{
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  border?: boolean;
  rounded?: boolean;
}

export default function Card({
  children,
  title,
  subtitle,
  footer,
  className = '',
  padding = 'medium',
  shadow = 'medium',
  border = true,
  rounded = true
}: CardProps) {
  // Map padding sizes to Tailwind classes
  const paddingClasses = {
    none: 'p-0',
    small: 'p-2 sm:p-3',
    medium: 'p-4 sm:p-5',
    large: 'p-6 sm:p-8'
  };

  // Map shadow sizes to Tailwind classes
  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow',
    large: 'shadow-lg'
  };

  // Build class string
  const cardClasses = [
    'bg-white',
    paddingClasses[padding],
    shadowClasses[shadow],
    border ? 'border border-gray-200' : '',
    rounded ? 'rounded-lg' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {(title || subtitle) && (
        <div className={`${padding !== 'none' ? 'mb-4' : ''}`}>
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div className="flex-grow">{children}</div>
      
      {footer && (
        <div className={`${padding !== 'none' ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
          {footer}
        </div>
      )}
    </div>
  );
}