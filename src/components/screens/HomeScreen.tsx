import React from 'react';
import { Bell, Flame, Dumbbell, Leaf, ChevronRight } from 'lucide-react';
import { FoodItem, ScreenId, UserProfile } from '../../types';
import { BottomNavBar } from '../BottomNavBar';

interface HomeScreenProps {
  user: UserProfile;
  foodItems: FoodItem[];
  onNavigate: (screen: ScreenId) => void;
  onSelectFood: (food: FoodItem) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  foodItems,
  onNavigate,
  onSelectFood,
}) => {
  // Calculate today's totals (e.g. within last 24h or first 3 items)
  const todayItems = foodItems.slice(0, 3);
  const totalCalories = todayItems.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = todayItems.reduce((acc, curr) => acc + curr.protein, 0);
  const totalCarbs = todayItems.reduce((acc, curr) => acc + curr.carbs, 0);

  const calPercentage = Math.min(Math.round((totalCalories / user.targetCalories) * 100), 100);

  // Circular gauge circumference
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (calPercentage / 100) * circumference;

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50/60 overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 no-scrollbar">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              Halo, {user.name} <span className="inline-block animate-pulse">👋</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Semangat jaga pola makanmu!</p>
          </div>

          <button
            onClick={() => alert('Tidak ada notifikasi baru.')}
            className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-700 hover:text-blue-600 relative active:scale-95 transition-transform cursor-pointer"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
          </button>
        </div>

        {/* Total Hari Ini Banner Card */}
        <div
          onClick={() => onNavigate('history')}
          className="w-full bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 rounded-2xl p-4 text-white shadow-lg shadow-blue-500/20 flex items-center justify-between cursor-pointer hover:shadow-xl hover:shadow-blue-500/25 transition-all group active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            {/* Circular Ring Progress */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                {/* Background Track */}
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  className="text-blue-400/40"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="none"
                />
                {/* Progress Fill */}
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  className="text-white"
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                />
              </svg>
              <span className="absolute text-sm font-extrabold tracking-tight text-white">
                {calPercentage}%
              </span>
            </div>

            {/* Calories Text */}
            <div className="flex flex-col">
              <span className="text-xs text-blue-100 font-medium">Total Hari Ini</span>
              <span className="text-2xl font-black tracking-tight leading-tight">
                {totalCalories.toLocaleString('id-ID')}
              </span>
              <span className="text-[11px] text-blue-100 font-medium">
                dari {user.targetCalories.toLocaleString('id-ID')} kkal
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-3 gap-2.5 mt-3.5">
          {/* Kalori */}
          <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-1.5 shadow-2xs">
              <Flame className="w-4 h-4 fill-orange-500" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">Kalori</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">
              {totalCalories.toLocaleString('id-ID')}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              / {user.targetCalories.toLocaleString('id-ID')} kkal
            </span>
          </div>

          {/* Protein */}
          <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 shadow-2xs">
              <Dumbbell className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">Protein</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">{totalProtein}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">/ {user.targetProtein} g</span>
          </div>

          {/* Karbohidrat */}
          <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 shadow-2xs">
              <Leaf className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">Karbohidrat</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5">{totalCarbs}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">/ {user.targetCarbs} g</span>
          </div>
        </div>

        {/* Section: Riwayat Terbaru */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Riwayat Terbaru</h2>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>

          {/* Meal List */}
          <div className="flex flex-col gap-2.5">
            {todayItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectFood(item);
                  onNavigate('analysis');
                }}
                className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-xs hover:border-blue-200 hover:shadow-sm transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-100 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      <span className="font-semibold text-slate-700">{item.calories} kkal</span>
                      {' • '}P {item.protein}g{' • '}K {item.carbs}g
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                  <span>{item.timeAgo}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav with elevated Camera Button */}
      <BottomNavBar currentScreen="home" onNavigate={onNavigate} showCenterCameraButton={true} />
    </div>
  );
};
