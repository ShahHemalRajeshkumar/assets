import React from 'react';

const Icon = ({ fill = false, className }) => {
  if (fill) {
    return (
      <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
        <path
          d='M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z'
          fill='#F9843B'
          fillOpacity='1'
        />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.81 9.12L22 9.74L16.55 14.47L18.18 21.5L12 17.77L5.82 21.5L7.46 14.47L2 9.74L9.19 9.13L12 2.5L14.81 9.12ZM8.24 18.17L12 15.9L15.77 18.18L14.77 13.9L18.09 11.02L13.71 10.64L12 6.6L10.3 10.63L5.92 11.01L9.24 13.89L8.24 18.17Z'
        fill='black'
        fillOpacity='0.54'
      />
    </svg>
  );
};
export default Icon;
