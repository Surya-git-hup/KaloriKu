import React from 'react';
import { X, Clock, Check, Trash2 } from 'lucide-react';
import { FoodItem } from '../../types';

interface FoodDetailModalProps {
  foodItem: FoodItem | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  foodItem,
  onClose,
  onDelete,
}) => {
  if (!foodItem) return null;

  const totalMacros = foodItem.protein + foodItem.carbs + foodItem.fat || 1;
  const pPct = Math.round((foodItem.protein / totalMacros) * 100);
  const cPct = Math.round((foodItem.carbs / totalMacros) * 100);
  const fPct = 100 - pPct - cPct;

  const radius = 36;
  const circumference = 2 * Math.PI * radius; // 226.19
  const pStroke = (pPct / 100) * circumference;
  const cStroke = (cPct / 100) * circumference;
  const fStroke = (fPct / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Modal Image Header */}
        <div className="relative h-48 w-full bg-slate-100 shrink-0">
          <img
            src={foodItem.image}
            alt={foodItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/90 px-2 py-0.5 rounded-md">
              {foodItem.category || 'Hidangan'}
            </span>
            <h3 className="text-lg font-black tracking-tight mt-1">{foodItem.name}</h3>
            <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{foodItem.portion}</span>
              <span>·</span>
              <span>{foodItem.timeAgo}</span>
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
          {/* AI Badge */}
          {foodItem.analyzedWithAi && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-xs font-bold text-emerald-700 border border-emerald-200/50">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Dianalisis dan Diverifikasi oleh AI KaloriKu</span>
            </div>
          )}

          {/* Donut macro card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} stroke="#E2E8F0" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#3B82F6"
                  strokeWidth="8"
                  strokeDasharray={`${pStroke} ${circumference}`}
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#10B981"
                  strokeWidth="8"
                  strokeDasharray={`${cStroke} ${circumference}`}
                  strokeDashoffset={-pStroke}
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#F59E0B"
                  strokeWidth="8"
                  strokeDasharray={`${fStroke} ${circumference}`}
                  strokeDashoffset={-(pStroke + cStroke)}
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-slate-900 leading-none">
                  {foodItem.calories}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 mt-0.5">kkal</span>
              </div>
            </div>

            {/* Macros */}
            <div className="space-y-1.5 text-xs pr-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600 font-medium w-16">Protein</span>
                <span className="font-bold text-slate-900">{foodItem.protein} g</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600 font-medium w-16">Karbo</span>
                <span className="font-bold text-slate-900">{foodItem.carbs} g</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600 font-medium w-16">Lemak</span>
                <span className="font-bold text-slate-900">{foodItem.fat} g</span>
              </div>
            </div>
          </div>

          {/* Micronutrient breakdown */}
          <div className="border border-slate-100 rounded-2xl p-3.5 text-xs space-y-1">
            <h5 className="font-bold text-slate-900 mb-2">Rincian Gizi Lengkap</h5>
            <div className="divide-y divide-slate-100">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Serat Pangan</span>
                <span className="font-semibold text-slate-800">{foodItem.fiber} g</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Gula Alami & Tambahan</span>
                <span className="font-semibold text-slate-800">{foodItem.sugar} g</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Natrium / Garam</span>
                <span className="font-semibold text-slate-800">{foodItem.sodium} mg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          {onDelete && (
            <button
              onClick={() => {
                onDelete(foodItem.id);
                onClose();
              }}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Hidangan</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
