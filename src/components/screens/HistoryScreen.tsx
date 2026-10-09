import React, { useState } from 'react';
import { ChevronLeft, RotateCcw, Search, ChevronRight } from 'lucide-react';
import { FoodItem, ScreenId } from '../../types';
import { BottomNavBar } from '../BottomNavBar';

interface HistoryScreenProps {
  foodItems: FoodItem[];
  onNavigate: (screen: ScreenId) => void;
  onSelectFood: (food: FoodItem) => void;
  onResetData: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  foodItems,
  onNavigate,
  onSelectFood,
  onResetData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Semua' | '7 Hari' | '30 Hari' | 'Custom'>('Semua');

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === '7 Hari') {
      return item.timestamp >= Date.now() - 7 * 86400 * 1000;
    }
    if (activeFilter === '30 Hari') {
      return item.timestamp >= Date.now() - 30 * 86400 * 1000;
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50/60 overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 no-scrollbar">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200/60 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <h1 className="text-sm font-bold text-slate-900 tracking-tight">Riwayat Makanan</h1>

          <button
            onClick={onResetData}
            title="Muat ulang riwayat"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200/60 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari makanan..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar">
          {(['Semua', '7 Hari', '30 Hari', 'Custom'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Food Items List */}
        <div className="flex flex-col gap-2.5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Tidak ada makanan ditemukan untuk pencarian &quot;{searchQuery}&quot;.
            </div>
          ) : (
            filteredItems.map((item) => (
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
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-100 group-hover:scale-105 transition-transform shrink-0"
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
            ))
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNavBar currentScreen="history" onNavigate={onNavigate} />
    </div>
  );
};
