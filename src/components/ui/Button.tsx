'use client';

import Icon from './Icon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'green' | 'yellow' | 'ghost' | 'ink';
  onClick?: () => void;
  icon?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'green', 
  onClick, 
  icon, 
  className = '',
  type = 'button',
  disabled = false
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
      {icon && <Icon name={icon} />}
    </button>
  );
}