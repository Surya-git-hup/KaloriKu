import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  currentTime?: string;
  className?: string;
  showFrame?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  currentTime = '9:41',
  className = '',
  showFrame = true,
}) => {
  if (!showFrame) {
    return <div className={`w-full max-w-md mx-auto min-h-screen bg-white ${className}`}>{children}</div>;
  }

  return (
    <div className="relative mx-auto flex flex-col items-center">
      {/* Phone Outer Shell */}
      <div
        className={`w-full max-w-[400px] h-[844px] bg-white rounded-[44px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/10 border-[10px] border-slate-900 flex flex-col overflow-hidden relative select-none ${className}`}
      >
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-50 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950/80 mr-3 ring-1 ring-slate-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-blue-900/30 ring-1 ring-slate-800" />
        </div>

        {/* Status Bar */}
        <div className="w-full pt-3 px-7 pb-1 flex items-center justify-between text-xs font-semibold text-slate-800 shrink-0 z-40 bg-transparent">
          <span className="font-semibold tracking-tight">{currentTime}</span>
          <div className="flex items-center gap-1.5 text-slate-800">
            {/* Cellular signal bars */}
            <svg className="w-4 h-3.5 fill-current" viewBox="0 0 17 12">
              <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
              <rect x="4" y="6" width="2.5" height="6" rx="0.5" />
              <rect x="8" y="3.5" width="2.5" height="8.5" rx="0.5" />
              <rect x="12" y="1" width="2.5" height="11" rx="0.5" />
            </svg>
            <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
            <Battery className="w-4 h-4 fill-current rotate-90" />
          </div>
        </div>

        {/* App Content Container */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col no-scrollbar">
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="w-full py-1.5 shrink-0 flex justify-center bg-white/80 backdrop-blur-xs z-40 pointer-events-none">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
