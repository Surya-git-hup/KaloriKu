import React, { useState } from 'react';
import { ChevronLeft, Bookmark, Clock, Check, CheckCircle2 } from 'lucide-react';
import { FoodItem, ScreenId } from '../../types';

interface AnalysisResultScreenProps {
  foodItem: FoodItem;
  onNavigate: (screen: ScreenId) => void;
  onSaveToHistory: (foodItem: FoodItem) => void;
}

export const AnalysisResultScreen: React.FC<AnalysisResultScreenProps> = ({
  foodItem,
  onNavigate,
  onSaveToHistory,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  // Calculate macro percentages for circular donut
  const totalMacrosGrams = foodItem.protein + foodItem.carbs + foodItem.fat;
  const proteinPercent = Math.round((foodItem.protein / totalMacrosGrams) * 100);
  const carbsPercent = Math.round((foodItem.carbs / totalMacrosGrams) * 100);
  const fatPercent = 100 - proteinPercent - carbsPercent;

  // Donut circumference (radius = 38)
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // approx 238.76

  const proteinStroke = (proteinPercent / 100) * circumference;
  const carbsStroke = (carbsPercent / 100) * circumference;
  const fatStroke = (fatPercent / 100) * circumference;

  const handleSave = () => {
    setIsSaved(true);
    onSaveToHistory(foodItem);
    setTimeout(() => {
      onNavigate('home');
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50/60 overflow-y-auto px-5 pt-3 pb-6 no-scrollbar">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200/60 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <h1 className="text-sm font-bold text-slate-900 tracking-tight">Hasil Analisis</h1>

          <button
            onClick={handleSave}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isSaved ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-600' : ''}`} />
          </button>
        </div>

        {/* Scanned Food Summary Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center gap-3.5 mb-3.5">
          <img
            src={foodItem.image}
            alt={foodItem.name}
            className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-100 shadow-2xs"
          />
          <div className="flex-1">
            <h2 className="text-sm font-extrabold text-slate-900 leading-snug">{foodItem.name}</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{foodItem.portion}</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700 border border-emerald-200/50">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Dianalisis dengan AI</span>
            </div>
          </div>
        </div>

        {/* Calorie Donut Chart & Macro Breakdown */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs mb-3.5">
          <div className="flex items-center justify-between gap-2">
            {/* Donut Gauge */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#F1F5F9"
                  strokeWidth="8"
                  fill="none"
                />

                {/* Protein Segment (Blue) */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#3B82F6"
                  strokeWidth="8"
                  strokeDasharray={`${proteinStroke} ${circumference}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Carbs Segment (Green) */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#10B981"
                  strokeWidth="8"
                  strokeDasharray={`${carbsStroke} ${circumference}`}
                  strokeDashoffset={-(proteinStroke + 2)}
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Fat Segment (Orange) */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#F59E0B"
                  strokeWidth="8"
                  strokeDasharray={`${fatStroke} ${circumference}`}
                  strokeDashoffset={-(proteinStroke + carbsStroke + 4)}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Center Donut Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                  {foodItem.calories}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">kkal</span>
                <span className="text-[9px] font-medium text-slate-400">Total Kalori</span>
              </div>
            </div>

            {/* Macro Breakdown List */}
            <div className="flex flex-col gap-3 pr-2">
              {/* Protein */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                <span className="text-xs text-slate-600 font-medium w-20">Protein</span>
                <span className="text-xs font-bold text-slate-900">{foodItem.protein} g</span>
              </div>

              {/* Karbohidrat */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs text-slate-600 font-medium w-20">Karbohidrat</span>
                <span className="text-xs font-bold text-slate-900">{foodItem.carbs} g</span>
              </div>

              {/* Lemak */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-xs text-slate-600 font-medium w-20">Lemak</span>
                <span className="text-xs font-bold text-slate-900">{foodItem.fat} g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional Details Card (Rincian Gizi) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs mb-3.5">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight mb-2.5">Rincian Gizi</h3>
          <div className="divide-y divide-slate-100">
            <div className="flex justify-between py-1.5 text-xs">
              <span className="text-slate-500">Serat</span>
              <span className="font-semibold text-slate-800">{foodItem.fiber} g</span>
            </div>
            <div className="flex justify-between py-1.5 text-xs">
              <span className="text-slate-500">Gula</span>
              <span className="font-semibold text-slate-800">{foodItem.sugar} g</span>
            </div>
            <div className="flex justify-between py-1.5 text-xs">
              <span className="text-slate-500">Natrium</span>
              <span className="font-semibold text-slate-800">{foodItem.sodium} mg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-2">
        {/* Primary Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaved}
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Tersimpan di Riwayat!</span>
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4" />
              <span>Simpan ke Riwayat</span>
            </>
          )}
        </button>

        {/* Secondary Try Another Button */}
        <button
          onClick={() => onNavigate('scan')}
          className="w-full py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 text-xs font-semibold rounded-xl transition-all shadow-2xs cursor-pointer text-center"
        >
          Coba Makanan Lain
        </button>
      </div>
    </div>
  );
};
