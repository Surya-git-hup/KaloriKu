import React from 'react';

interface KaloriKuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const KaloriKuLogo: React.FC<KaloriKuLogoProps> = ({ size = 'md', className = '' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-1 ${className}`}>
      {/* Circle Icon */}
      <div
        className={`${iconSizes[size]} rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-500 shadow-md shadow-blue-500/20 flex items-center justify-center relative overflow-hidden`}
      >
        {/* Subtle decorative inner glow */}
        <div className="absolute inset-0 bg-radial from-white/20 to-transparent" />
        
        {/* Fork and Spoon inside bowl symbol */}
        <svg viewBox="0 0 36 36" fill="none" className="w-3/5 h-3/5 text-white" stroke="currentColor">
          {/* Bowl base */}
          <path
            d="M6 18C6 24.6274 11.3726 30 18 30C24.6274 30 30 24.6274 30 18H6Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          {/* Fork */}
          <path
            d="M13 6V15M11 6V11C11 12.1046 11.8954 13 13 13C14.1046 13 15 12.1046 15 11V6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Spoon */}
          <path
            d="M23 6C21.3431 6 20 7.34315 20 9C20 10.6569 21.3431 12 23 12V15M23 6C24.6569 6 26 7.34315 26 9C26 10.6569 24.6569 12 23 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Small green leaf sprout on top */}
          <path
            d="M18 12C18 9 20.5 7 20.5 7C20.5 7 20.5 9.5 18 12Z"
            fill="#34D399"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <h1 className={`${textSizes[size]} font-bold tracking-tight text-blue-900 flex items-center gap-0.5`}>
        Kalori<span className="text-blue-600">Ku</span>
      </h1>
    </div>
  );
};
