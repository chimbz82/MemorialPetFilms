
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled, 
  className = '',
  loading = false
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-brand-primary text-brand-body hover:bg-[#FFB861] shadow-sm",
    secondary: "bg-brand-secondary text-white hover:opacity-90",
    outline: "border-2 border-brand-primary text-brand-heading hover:bg-brand-section/30",
    ghost: "text-brand-body/70 hover:text-brand-body hover:bg-brand-emotion/20"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
