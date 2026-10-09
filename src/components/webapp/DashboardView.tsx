import React, { useState } from 'react';
import {
  Flame,
  Dumbbell,
  Leaf,
  Droplets,
  Camera,
  ChevronRight,
  Plus,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { FoodItem, UserProfile } from '../../types';
import { WebTab } from './Sidebar';

interface DashboardViewProps {
  user: UserProfile;
  foodItems: FoodItem[];
  onNavigate: (tab: WebTab) => void;
  onSelectFood: (food: FoodItem) => void;
  onOpenManualModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  foodItems,
  onNavigate,
  onSelectFood,
  onOpenManualModal,
}) => {
  const [mealCategoryFilter, setMealCategoryFilter] = useState<'Semua' | 'Sarapan' | 'Makan Siang' | 'Makan Malam'>('Semua');

  // Calculate totals from today's items
  const todayItems = foodItems.slice(0, 4);
  const totalCalories = todayItems.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = todayItems.reduce((acc, curr) => acc + curr.protein, 0);
  const totalCarbs = todayItems.reduce((acc, curr) => acc + curr.carbs, 0);
  const totalFat = todayItems.reduce((acc, curr) => acc + curr.fat, 0);

  const calPercentage = Math.min(Math.round((totalCalories / user.targetCalories) * 100), 100);
  const remainingCalories = Math.max(0, user.targetCalories - totalCalories);

  // Filtered items
  const displayItems =
    mealCategoryFilter === 'Semua'
      ? todayItems
      : todayItems.filter((i) => i.category === mealCategoryFilter);

  // SVG Ring calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (calPercentage / 100) * circumference;

  // Macro percentages for the donut
  const totalMacroGrams = totalProtein + totalCarbs + totalFat || 1;
  const proteinShare = Math.round((totalProtein / totalMacroGrams) * 100);
  const carbsShare = Math.round((totalCarbs / totalMacroGrams) * 100);
  const fatShare = 100 - proteinShare - carbsShare;

  return (
    <div className="space-y-6">
      {/* Top Hero Section: Calorie Ring & AI Scan Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Total Hari Ini Banner (7 columns) */}
        <div className="lg:col-span-7 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 rounded-3xl p-6 text-white shadow-md shadow-blue-500/15 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between z-10">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-100">
                Ringkasan Harian
              </span>
              <h2 className="text-xl md:text-2xl font-black tracking-tight mt-0.5">
                Total Asupan Hari Ini
              </h2>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Detail</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-4 z-10">
            {/* Donut progress */}
            <div className="sm:col-span-5 flex items-center justify-center sm:justify-start">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black tracking-tight">{calPercentage}%</span>
                  <span className="text-[10px] text-blue-100 font-medium">Tercapai</span>
                </div>
              </div>
            </div>

            {/* Calories Breakdown Numbers */}
            <div className="sm:col-span-7 flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black tracking-tight tabular-nums">
                  {totalCalories.toLocaleString('id-ID')}
                </span>
                <span className="text-sm font-semibold text-blue-100">
                  / {user.targetCalories.toLocaleString('id-ID')} kkal
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-blue-100 pt-1 border-t border-white/20">
                <div>
                  <span className="block text-[10px] text-blue-200">Sisa Kalori</span>
                  <span className="text-sm font-bold text-white tabular-nums">
                    {remainingCalories.toLocaleString('id-ID')} kkal
                  </span>
                </div>
                <div className="border-l border-white/20 pl-4">
                  <span className="block text-[10px] text-blue-200">Status Diet</span>
                  <span className="text-sm font-bold text-white">
                    {calPercentage <= 100 ? 'Sesuai Target' : 'Melebihi Target'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Scanner Fast Access Card (5 columns) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Food Vision</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              Pindai & Kenali Makanan Secara Otomatis
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Cukup ambil foto piring makananmu atau unggah gambar. AI KaloriKu akan menghitung porsi, kalori, serta makronutrisi dalam hitungan detik.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center -space-x-2">
              <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-slate-100">
                <img
                  src="/src/assets/images/ayam_geprek_plate_1791529563455.jpg"
                  alt="Ayam Geprek"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-slate-100">
                <img
                  src="/src/assets/images/healthy_boiled_egg_breakfast_1791529576223.jpg"
                  alt="Telur Rebus"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-slate-100">
                <img
                  src="/src/assets/images/banana_oatmeal_bowl_1791529587758.jpg"
                  alt="Oatmeal"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <button
              onClick={() => onNavigate('scan')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Buka Scanner AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Macro KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Kalori */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Kalori Terpakai</span>
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-orange-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 tabular-nums">
              {totalCalories.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-slate-400">/ {user.targetCalories} kkal</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalCalories / user.targetCalories) * 100)}%` }}
            />
          </div>
        </div>

        {/* Protein */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Protein</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Dumbbell className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 tabular-nums">{totalProtein}</span>
            <span className="text-xs text-slate-400">/ {user.targetProtein} g</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalProtein / user.targetProtein) * 100)}%` }}
            />
          </div>
        </div>

        {/* Karbohidrat */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Karbohidrat</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 tabular-nums">{totalCarbs}</span>
            <span className="text-xs text-slate-400">/ {user.targetCarbs} g</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalCarbs / user.targetCarbs) * 100)}%` }}
            />
          </div>
        </div>

        {/* Lemak */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Lemak</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Droplets className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 tabular-nums">{totalFat}</span>
            <span className="text-xs text-slate-400">/ {user.targetFat} g</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalFat / user.targetFat) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Split: Meals Log & Macro Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Meals (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Menu Makanan Hari Ini
                </h3>
                <p className="text-xs text-slate-400">
                  {todayItems.length} hidangan tercatat dalam jurnal harian
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                {(['Semua', 'Sarapan', 'Makan Siang', 'Makan Malam'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMealCategoryFilter(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      mealCategoryFilter === cat
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal List Cards */}
            <div className="divide-y divide-slate-100">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectFood(item)}
                  className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 rounded-2xl px-2 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-1 ring-slate-200/80 group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-800 tabular-nums">
                          {item.calories} kkal
                        </span>
                        {' · '}P: {item.protein}g{' · '}K: {item.carbs}g{' · '}L: {item.fat}g
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.portion}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                      {item.timeAgo}
                    </span>
                    <button className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Add button */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onOpenManualModal}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Catatan Makanan Manual</span>
              </button>
              <button
                onClick={() => onNavigate('history')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Buka Riwayat Lengkap →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Macro Ratio Donut & Health Insights (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Macro Ratio Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-3">
              Rasio Makronutrisi Hari Ini
            </h3>

            <div className="flex items-center justify-around my-2">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#E2E8F0" strokeWidth="8" fill="none" />
                  {/* Protein Segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    strokeDasharray={`${(proteinShare / 100) * 238.76} 238.76`}
                    fill="none"
                  />
                  {/* Carbs Segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeDasharray={`${(carbsShare / 100) * 238.76} 238.76`}
                    strokeDashoffset={-((proteinShare / 100) * 238.76)}
                    fill="none"
                  />
                  {/* Fat Segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#F59E0B"
                    strokeWidth="8"
                    strokeDasharray={`${(fatShare / 100) * 238.76} 238.76`}
                    strokeDashoffset={-(((proteinShare + carbsShare) / 100) * 238.76)}
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-black text-slate-800">{totalCalories}</span>
                  <span className="text-[9px] text-slate-400">Total kkal</span>
                </div>
              </div>

              {/* Macro Legend */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-slate-500 w-16">Protein</span>
                  <span className="font-bold text-slate-800">{proteinShare}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-500 w-16">Karbo</span>
                  <span className="font-bold text-slate-800">{carbsShare}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-500 w-16">Lemak</span>
                  <span className="font-bold text-slate-800">{fatShare}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Calorie Trends Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-2">
              Tren Kalori 7 Hari Terakhir
            </h3>
            <p className="text-[11px] text-slate-400 mb-4">Target harian rata-rata: 2.000 kkal</p>

            <div className="flex items-end justify-between h-24 pt-4 border-b border-slate-100 px-2">
              {[
                { day: 'Sen', cal: 1850, h: '75%' },
                { day: 'Sel', cal: 1950, h: '85%' },
                { day: 'Rab', cal: 2100, h: '95%' },
                { day: 'Kam', cal: 1800, h: '70%' },
                { day: 'Jum', cal: totalCalories, h: `${calPercentage}%`, active: true },
                { day: 'Sab', cal: 0, h: '10%' },
                { day: 'Min', cal: 0, h: '10%' },
              ].map((bar) => (
                <div key={bar.day} className="flex flex-col items-center gap-1.5 group">
                  <div className="w-5 bg-slate-100 rounded-t-lg h-20 flex items-end overflow-hidden">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        bar.active ? 'bg-blue-600' : 'bg-slate-300 group-hover:bg-blue-400'
                      }`}
                      style={{ height: bar.h }}
                      title={`${bar.day}: ${bar.cal} kkal`}
                    />
                  </div>
                  <span className={`text-[10px] font-semibold ${bar.active ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
