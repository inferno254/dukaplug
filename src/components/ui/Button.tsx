'use client';

import Icon from './Icon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'green' | 'yellow' | 'ghost' | 'ink';
  onClick?: () => void;
  icon?: string;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'green', 
  onClick, 
  icon, 
  className = '' 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
      {icon && <Icon name={icon} />}
    </button>
  );
}