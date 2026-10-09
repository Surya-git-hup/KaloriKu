import React from 'react';
import { PhoneFrame } from './PhoneFrame';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CameraScanScreen } from './screens/CameraScanScreen';
import { AnalysisResultScreen } from './screens/AnalysisResultScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { FoodItem, ScreenId, UserProfile } from '../types';

interface OverviewGalleryProps {
  user: UserProfile;
  foodItems: FoodItem[];
  selectedFood: FoodItem;
  onSelectScreen: (screen: ScreenId) => void;
  onNavigate: (screen: ScreenId) => void;
  onSelectFood: (food: FoodItem) => void;
  onSaveToHistory: (food: FoodItem) => void;
  onScanComplete: (item: Omit<FoodItem, 'id' | 'timeAgo' | 'timestamp'>) => void;
  onUpdateUser: (u: Partial<UserProfile>) => void;
  onResetData: () => void;
}

export const OverviewGallery: React.FC<OverviewGalleryProps> = ({
  user,
  foodItems,
  selectedFood,
  onSelectScreen,
  onNavigate,
  onSelectFood,
  onSaveToHistory,
  onScanComplete,
  onUpdateUser,
  onResetData,
}) => {
  const screens = [
    {
      id: 'login' as ScreenId,
      number: '1',
      title: 'Login',
      component: (
        <LoginScreen
          onNavigate={(s) => onNavigate(s)}
          onLoginSuccess={() => onNavigate('home')}
        />
      ),
    },
    {
      id: 'register' as ScreenId,
      number: '2',
      title: 'Register',
      component: (
        <RegisterScreen
          onNavigate={(s) => onNavigate(s)}
          onRegisterSuccess={() => onNavigate('home')}
        />
      ),
    },
    {
      id: 'home' as ScreenId,
      number: '3',
      title: 'Home (Dashboard)',
      component: (
        <HomeScreen
          user={user}
          foodItems={foodItems}
          onNavigate={(s) => onNavigate(s)}
          onSelectFood={(f) => {
            onSelectFood(f);
            onNavigate('analysis');
          }}
        />
      ),
    },
    {
      id: 'scan' as ScreenId,
      number: '4',
      title: 'Kamera & Pemindaian',
      component: (
        <CameraScanScreen
          onNavigate={(s) => onNavigate(s)}
          onScanComplete={(item) => onScanComplete(item)}
        />
      ),
    },
    {
      id: 'analysis' as ScreenId,
      number: '5',
      title: 'Hasil Analisis',
      component: (
        <AnalysisResultScreen
          foodItem={selectedFood}
          onNavigate={(s) => onNavigate(s)}
          onSaveToHistory={(f) => onSaveToHistory(f)}
        />
      ),
    },
    {
      id: 'history' as ScreenId,
      number: '6',
      title: 'Riwayat',
      component: (
        <HistoryScreen
          foodItems={foodItems}
          onNavigate={(s) => onNavigate(s)}
          onSelectFood={(f) => {
            onSelectFood(f);
            onNavigate('analysis');
          }}
          onResetData={onResetData}
        />
      ),
    },
    {
      id: 'profile' as ScreenId,
      number: '7',
      title: 'Profil',
      component: (
        <ProfileScreen
          user={user}
          onUpdateUser={onUpdateUser}
          onNavigate={(s) => onNavigate(s)}
          onLogout={() => onNavigate('login')}
        />
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">
          Galeri Lengkap 7 Layar Desain KaloriKu
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Klik tombol &quot;Buka Interaktif&quot; pada layar mana saja untuk mencoba fitur secara langsung
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {screens.map((item) => (
          <div key={item.id} className="flex flex-col items-center group w-full max-w-[320px]">
            {/* Screen Container with scale */}
            <div className="relative w-[320px] h-[640px] rounded-[36px] overflow-hidden shadow-xl ring-1 ring-slate-900/10 border-4 border-slate-800 bg-white transform transition-transform group-hover:scale-[1.02] flex flex-col">
              {/* Overlay quick open button */}
              <div className="absolute top-3 right-3 z-50">
                <button
                  onClick={() => onSelectScreen(item.id)}
                  className="px-2.5 py-1 bg-blue-600/90 hover:bg-blue-600 text-white text-[11px] font-semibold rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-95 cursor-pointer"
                >
                  Buka Interaktif ↗
                </button>
              </div>

              {/* Status bar */}
              <div className="w-full pt-2.5 px-5 pb-1 flex items-center justify-between text-[10px] font-semibold text-slate-800 shrink-0 z-40 bg-white">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2 bg-slate-800 rounded-2xs" />
                  <div className="w-3 h-2 border border-slate-800 rounded-2xs p-0.5">
                    <div className="w-full h-full bg-slate-800" />
                  </div>
                </div>
              </div>

              {/* Component view */}
              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
                {item.component}
              </div>
            </div>

            {/* Title & number */}
            <div className="mt-3 text-center">
              <span className="text-sm font-bold text-slate-900">
                {item.number}. {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
