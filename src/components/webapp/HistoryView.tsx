import React, { useState } from 'react';
import { Search, RotateCcw, Trash2, ChevronRight, Plus, Calendar, Clock } from 'lucide-react';
import { FoodItem } from '../../types';

interface HistoryViewProps {
  foodItems: FoodItem[];
  onSelectFood: (food: FoodItem) => void;
  onDeleteItem: (id: string) => void;
  onResetData: () => void;
  onOpenManualModal: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  foodItems,
  onSelectFood,
  onDeleteItem,
  onResetData,
  onOpenManualModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<'Semua' | '7 Hari' | '30 Hari'>('Semua');
  const [categoryFilter, setCategoryFilter] = useState<'Semua' | 'Sarapan' | 'Makan Siang' | 'Makan Malam'>('Semua');

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (categoryFilter !== 'Semua' && item.category !== categoryFilter) {
      return false;
    }

    if (timeFilter === '7 Hari') {
      return item.timestamp >= Date.now() - 7 * 86400 * 1000;
    }
    if (timeFilter === '30 Hari') {
      return item.timestamp >= Date.now() - 30 * 86400 * 1000;
    }

    return true;
  });

  const totalCalories = filteredItems.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = filteredItems.reduce((acc, curr) => acc + curr.protein, 0);
  const totalCarbs = filteredItems.reduce((acc, curr) => acc + curr.carbs, 0);
  const totalFat = filteredItems.reduce((acc, curr) => acc + curr.fat, 0);

  return (
    <div className="space-y-6">
      {/* Top Filter and Actions Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari makanan dalam riwayat..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onResetData}
              title="Reset ke data awal"
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              onClick={onOpenManualModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Hidangan</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Time range pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Waktu:
            </span>
            {(['Semua', '7 Hari', '30 Hari'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Kategori:</span>
            {(['Semua', 'Sarapan', 'Makan Siang', 'Makan Malam'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Aggregate Stats Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Total Kalori</span>
          <p className="text-xl font-black text-slate-900 mt-1 tabular-nums">
            {totalCalories.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-400">kkal</span>
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Total Protein</span>
          <p className="text-xl font-black text-blue-600 mt-1 tabular-nums">
            {totalProtein} <span className="text-xs font-normal text-slate-400">g</span>
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Total Karbohidrat</span>
          <p className="text-xl font-black text-emerald-600 mt-1 tabular-nums">
            {totalCarbs} <span className="text-xs font-normal text-slate-400">g</span>
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Total Lemak</span>
          <p className="text-xl font-black text-amber-600 mt-1 tabular-nums">
            {totalFat} <span className="text-xs font-normal text-slate-400">g</span>
          </p>
        </div>
      </div>

      {/* Meals Table / List Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Daftar Riwayat Asupan ({filteredItems.length})
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Menampilkan data sesuai filter aktif
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm font-semibold">Tidak ada riwayat makanan ditemukan.</p>
            <p className="text-xs mt-1">Coba sesuaikan kata kunci pencarian atau filter waktu.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/80 transition-colors group"
              >
                {/* Food info */}
                <div
                  onClick={() => onSelectFood(item)}
                  className="flex items-center gap-4 flex-1 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-1 ring-slate-200/80 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      {item.analyzedWithAi && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md hidden sm:inline">
                          AI Verified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="font-bold text-slate-900 tabular-nums">
                        {item.calories} kkal
                      </span>
                      <span>·</span>
                      <span>P: {item.protein}g</span>
                      <span>·</span>
                      <span>K: {item.carbs}g</span>
                      <span>·</span>
                      <span>L: {item.fat}g</span>
                      <span>·</span>
                      <span className="text-slate-400">{item.portion}</span>
                    </div>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {item.timeAgo}
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    title="Hapus hidangan"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectFood(item)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
