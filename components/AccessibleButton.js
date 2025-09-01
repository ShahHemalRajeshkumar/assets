import React from 'react';

const AccessibleButton = ({ 
  children, 
  onClick, 
  className = '', 
  ariaLabel, 
  title,
  type = 'button',
  disabled = false,
  ...props 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      title={title || ariaLabel}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default AccessibleButton;