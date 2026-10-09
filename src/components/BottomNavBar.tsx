import React from 'react';
import { Home, Clock, User, Camera } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  showCenterCameraButton?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  showCenterCameraButton = false,
}) => {
  return (
    <div className="w-full bg-white border-t border-slate-100 px-6 py-2 shrink-0 flex items-center justify-around relative shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-30">
      {/* Tab: Beranda */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-1 transition-all group ${
          currentScreen === 'home' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <div className={`p-1 rounded-xl transition-colors ${currentScreen === 'home' ? 'bg-blue-50' : ''}`}>
          <Home className="w-5 h-5" strokeWidth={currentScreen === 'home' ? 2.5 : 2} />
        </div>
        <span className="text-[11px] font-semibold tracking-tight">Beranda</span>
      </button>

      {/* Floating Center Action Button (Screen 3 style) */}
      {showCenterCameraButton ? (
        <div className="relative -top-5 flex flex-col items-center">
          <button
            onClick={() => onNavigate('scan')}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 hover:scale-105 active:scale-95 transition-transform ring-4 ring-white"
            title="Buka Kamera"
          >
            <Camera className="w-6 h-6 stroke-[2.2]" />
          </button>
          <span className="text-[10px] font-bold text-blue-600 mt-1 tracking-tight">Buka Kamera</span>
        </div>
      ) : null}

      {/* Tab: Riwayat */}
      <button
        onClick={() => onNavigate('history')}
        className={`flex flex-col items-center gap-1 transition-all group ${
          currentScreen === 'history' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <div className={`p-1 rounded-xl transition-colors ${currentScreen === 'history' ? 'bg-blue-50' : ''}`}>
          <Clock className="w-5 h-5" strokeWidth={currentScreen === 'history' ? 2.5 : 2} />
        </div>
        <span className="text-[11px] font-semibold tracking-tight">Riwayat</span>
      </button>

      {/* Tab: Profil */}
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center gap-1 transition-all group ${
          currentScreen === 'profile' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <div className={`p-1 rounded-xl transition-colors ${currentScreen === 'profile' ? 'bg-blue-50' : ''}`}>
          <User className="w-5 h-5" strokeWidth={currentScreen === 'profile' ? 2.5 : 2} />
        </div>
        <span className="text-[11px] font-semibold tracking-tight">Profil</span>
      </button>
    </div>
  );
};
