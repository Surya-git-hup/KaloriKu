import React, { useState } from 'react';
import { Sidebar, WebTab } from './components/webapp/Sidebar';
import { TopHeader } from './components/webapp/TopHeader';
import { DashboardView } from './components/webapp/DashboardView';
import { ScanView } from './components/webapp/ScanView';
import { HistoryView } from './components/webapp/HistoryView';
import { ProfileView } from './components/webapp/ProfileView';
import { FoodDetailModal } from './components/webapp/FoodDetailModal';
import { ManualFoodModal } from './components/webapp/ManualFoodModal';
import { AuthModal } from './components/webapp/AuthModal';
import { FoodItem, UserProfile } from './types';
import { INITIAL_FOOD_ITEMS, INITIAL_USER } from './data/foodData';
import { LayoutDashboard, Camera, History, User } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<WebTab>('dashboard');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add food item
  const handleAddFood = (newFood: FoodItem) => {
    setFoodItems([newFood, ...foodItems]);
  };

  // Delete food item
  const handleDeleteFood = (id: string) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  // Reset data
  const handleResetData = () => {
    setFoodItems(INITIAL_FOOD_ITEMS);
    setUser(INITIAL_USER);
  };

  // Update profile
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex shrink-0">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      </div>

      {/* Mobile Drawer (visible when menu toggled on mobile) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80%] bg-white h-full z-10 flex flex-col shadow-2xl">
            <Sidebar
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              user={user}
              onOpenAuth={() => {
                setIsAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <TopHeader
          activeTab={activeTab}
          user={user}
          onOpenManualModal={() => setIsManualModalOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* View Content Canvas */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-8">
          {activeTab === 'dashboard' && (
            <DashboardView
              user={user}
              foodItems={foodItems}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectFood={(food) => setSelectedFood(food)}
              onOpenManualModal={() => setIsManualModalOpen(true)}
            />
          )}

          {activeTab === 'scan' && (
            <ScanView onSaveToHistory={handleAddFood} />
          )}

          {activeTab === 'history' && (
            <HistoryView
              foodItems={foodItems}
              onSelectFood={(food) => setSelectedFood(food)}
              onDeleteItem={handleDeleteFood}
              onResetData={handleResetData}
              onOpenManualModal={() => setIsManualModalOpen(true)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              user={user}
              onUpdateUser={handleUpdateUser}
              onLogout={() => setIsAuthModalOpen(true)}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation Bar (Phone & Tablet) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 flex items-center justify-around z-40 shadow-lg">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'dashboard' ? 'text-blue-600 font-bold' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px]">Dashboard</span>
          </button>

          {/* Elevated Camera Center Button */}
          <div className="relative -top-4 flex flex-col items-center">
            <button
              onClick={() => setActiveTab('scan')}
              className="w-13 h-13 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 ring-4 ring-white active:scale-95 transition-transform cursor-pointer"
            >
              <Camera className="w-6 h-6 stroke-[2.2]" />
            </button>
            <span className="text-[10px] font-bold text-blue-600 mt-1">Scan AI</span>
          </div>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'history' ? 'text-blue-600 font-bold' : 'text-slate-400'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-[10px]">Riwayat</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'profile' ? 'text-blue-600 font-bold' : 'text-slate-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profil</span>
          </button>
        </nav>
      </div>

      {/* Modals */}
      <FoodDetailModal
        foodItem={selectedFood}
        onClose={() => setSelectedFood(null)}
        onDelete={handleDeleteFood}
      />

      <ManualFoodModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onAddFood={handleAddFood}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(name, email) => {
          setUser((prev) => ({ ...prev, name, email }));
        }}
      />
    </div>
  );
}
