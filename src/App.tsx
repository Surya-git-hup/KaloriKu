import React, { useState } from 'react';
import { Smartphone, LayoutGrid, RotateCcw } from 'lucide-react';
import { FoodItem, ScreenId, UserProfile } from './types';
import { INITIAL_FOOD_ITEMS, INITIAL_USER } from './data/foodData';
import { PhoneFrame } from './components/PhoneFrame';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { CameraScanScreen } from './components/screens/CameraScanScreen';
import { AnalysisResultScreen } from './components/screens/AnalysisResultScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { OverviewGallery } from './components/OverviewGallery';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [viewMode, setViewMode] = useState<'phone' | 'gallery'>('phone');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);
  const [selectedFood, setSelectedFood] = useState<FoodItem>(INITIAL_FOOD_ITEMS[0]);
  const [showPhoneFrame, setShowPhoneFrame] = useState(true);

  // Screen jump list
  const screenList: { id: ScreenId; label: string; number: string }[] = [
    { id: 'login', label: 'Login', number: '1' },
    { id: 'register', label: 'Register', number: '2' },
    { id: 'home', label: 'Home (Dashboard)', number: '3' },
    { id: 'scan', label: 'Kamera & Pemindaian', number: '4' },
    { id: 'analysis', label: 'Hasil Analisis', number: '5' },
    { id: 'history', label: 'Riwayat', number: '6' },
    { id: 'profile', label: 'Profil', number: '7' },
  ];

  // Handler when user scans food
  const handleScanComplete = (scanned: Omit<FoodItem, 'id' | 'timeAgo' | 'timestamp'>) => {
    const newItem: FoodItem = {
      ...scanned,
      id: `food-${Date.now()}`,
      timeAgo: 'Baru saja',
      timestamp: Date.now(),
    };
    setSelectedFood(newItem);
    setCurrentScreen('analysis');
  };

  // Handler when user saves to history
  const handleSaveToHistory = (itemToSave: FoodItem) => {
    // Check if already in list
    const exists = foodItems.some((item) => item.id === itemToSave.id);
    if (!exists) {
      setFoodItems([itemToSave, ...foodItems]);
    }
  };

  // Reset to initial data
  const handleResetData = () => {
    setFoodItems(INITIAL_FOOD_ITEMS);
    setUser(INITIAL_USER);
    setSelectedFood(INITIAL_FOOD_ITEMS[0]);
  };

  const handleUpdateUser = (updatedUser: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onLoginSuccess={(email) => {
              if (email) setUser((prev) => ({ ...prev, email }));
              setCurrentScreen('home');
            }}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onRegisterSuccess={(name, email) => {
              setUser((prev) => ({ ...prev, name, email }));
              setCurrentScreen('home');
            }}
          />
        );
      case 'home':
        return (
          <HomeScreen
            user={user}
            foodItems={foodItems}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onSelectFood={(food) => setSelectedFood(food)}
          />
        );
      case 'scan':
        return (
          <CameraScanScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onScanComplete={handleScanComplete}
          />
        );
      case 'analysis':
        return (
          <AnalysisResultScreen
            foodItem={selectedFood}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onSaveToHistory={handleSaveToHistory}
          />
        );
      case 'history':
        return (
          <HistoryScreen
            foodItems={foodItems}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onSelectFood={(food) => setSelectedFood(food)}
            onResetData={handleResetData}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onLogout={() => setCurrentScreen('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-800">
      {/* Top Prototype Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-sm">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight">KaloriKu</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold">
                  Prototipe Interaktif
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Berdasarkan 7 Layar Desain: Login, Register, Home, Scan, Analisis, Riwayat, Profil
              </p>
            </div>
          </div>

          {/* Mode Switcher & Tools */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700/80">
              <button
                onClick={() => setViewMode('phone')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'phone'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Mode Ponsel</span>
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'gallery'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Lihat 7 Layar</span>
              </button>
            </div>

            {/* Frame toggle (only in phone mode) */}
            {viewMode === 'phone' && (
              <button
                onClick={() => setShowPhoneFrame(!showPhoneFrame)}
                title="Toggle Bezel Ponsel"
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium cursor-pointer"
              >
                <span>{showPhoneFrame ? 'Frameless' : 'Bingkai Ponsel'}</span>
              </button>
            )}

            {/* Reset data */}
            <button
              onClick={handleResetData}
              title="Reset data ke awal"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Screen Selector Strip (Phone Mode only) */}
        {viewMode === 'phone' && (
          <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-medium text-slate-400 shrink-0 mr-1 hidden sm:inline">
              Lompat Layar:
            </span>
            {screenList.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setCurrentScreen(screen.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  currentScreen === screen.id
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 ring-1 ring-blue-500/30'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-700 text-[10px] flex items-center justify-center font-bold">
                  {screen.number}
                </span>
                <span>{screen.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950">
        {viewMode === 'phone' ? (
          <div className="w-full max-w-md my-auto">
            <PhoneFrame showFrame={showPhoneFrame}>
              {renderActiveScreen()}
            </PhoneFrame>
          </div>
        ) : (
          <OverviewGallery
            user={user}
            foodItems={foodItems}
            selectedFood={selectedFood}
            onSelectScreen={(screen) => {
              setCurrentScreen(screen);
              setViewMode('phone');
            }}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              setViewMode('phone');
            }}
            onSelectFood={(food) => setSelectedFood(food)}
            onSaveToHistory={handleSaveToHistory}
            onScanComplete={(item) => {
              handleScanComplete(item);
              setViewMode('phone');
            }}
            onUpdateUser={handleUpdateUser}
            onResetData={handleResetData}
          />
        )}
      </main>
    </div>
  );
}
