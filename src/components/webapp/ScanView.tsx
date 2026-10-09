import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  Zap,
  ZapOff,
  CheckCircle2,
  Bookmark,
  Clock,
  Check,
  RotateCcw,
} from 'lucide-react';
import { FoodItem } from '../../types';
import { PRESET_SCAN_ITEMS } from '../../data/foodData';

interface ScanViewProps {
  onSaveToHistory: (foodItem: FoodItem) => void;
}

export const ScanView: React.FC<ScanViewProps> = ({ onSaveToHistory }) => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [flashOn, setFlashOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeItem, setActiveItem] = useState<FoodItem>({
    ...PRESET_SCAN_ITEMS[0],
    id: 'food-scanned-default',
    timeAgo: 'Baru saja',
    timestamp: Date.now(),
  });

  const [useWebcam, setUseWebcam] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle webcam
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (useWebcam) {
      navigator.mediaDevices
        ?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(() => {
          setUseWebcam(false);
          alert('Kamera tidak dapat diakses atau izin ditolak. Menggunakan mode foto sampel.');
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [useWebcam]);

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIdx(idx);
    setUseWebcam(false);
    setIsSaved(false);
    const preset = PRESET_SCAN_ITEMS[idx];
    setActiveItem({
      ...preset,
      id: `food-scan-${Date.now()}`,
      timeAgo: 'Baru saja',
      timestamp: Date.now(),
    });
  };

  const handleTriggerAnalysis = () => {
    setIsScanning(true);
    setIsSaved(false);
    setTimeout(() => {
      setIsScanning(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setIsScanning(true);
      setIsSaved(false);
      setUseWebcam(false);
      setTimeout(() => {
        setIsScanning(false);
        setActiveItem({
          id: `food-upload-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Hidangan Segar',
          portion: '1 porsi (220 g)',
          calories: 395,
          protein: 26,
          carbs: 45,
          fat: 13,
          fiber: 5,
          sugar: 6,
          sodium: 310,
          image: url,
          timeAgo: 'Baru saja',
          timestamp: Date.now(),
          analyzedWithAi: true,
          category: 'Makan Siang',
        });
      }, 1000);
    }
  };

  const handleSave = () => {
    onSaveToHistory(activeItem);
    setIsSaved(true);
  };

  // Donut macro calculation
  const totalMacros = activeItem.protein + activeItem.carbs + activeItem.fat || 1;
  const pPct = Math.round((activeItem.protein / totalMacros) * 100);
  const cPct = Math.round((activeItem.carbs / totalMacros) * 100);
  const fPct = 100 - pPct - cPct;

  const radius = 38;
  const circumference = 2 * Math.PI * radius; // 238.76
  const pStroke = (pPct / 100) * circumference;
  const cStroke = (cPct / 100) * circumference;
  const fStroke = (fPct / 100) * circumference;

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Camera Viewfinder & Controls (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-5 text-white shadow-lg overflow-hidden flex flex-col justify-between min-h-[520px]">
          {/* Top Bar of Viewfinder */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                AI Vision Viewfinder
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFlashOn(!flashOn)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  flashOn ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Toggle Flash"
              >
                {flashOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setUseWebcam(!useWebcam)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  useWebcam
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {useWebcam ? 'Webcam Aktif' : 'Gunakan Kamera Fisik'}
              </button>
            </div>
          </div>

          {/* Center Viewfinder Screen with framing brackets */}
          <div className="relative my-4 flex-1 flex items-center justify-center overflow-hidden rounded-2xl bg-black min-h-[340px]">
            {useWebcam ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full relative flex items-center justify-center">
                <img
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="w-full h-full max-h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            )}

            {/* Target Framing Corners [  ] */}
            <div className="absolute w-64 h-64 pointer-events-none flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-9 h-9 border-t-4 border-l-4 border-white rounded-tl-xl shadow-md" />
                <div className="w-9 h-9 border-t-4 border-r-4 border-white rounded-tr-xl shadow-md" />
              </div>

              {/* AI Scan Pulse Line */}
              {isScanning && (
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-pulse my-auto" />
              )}

              <div className="flex justify-between">
                <div className="w-9 h-9 border-b-4 border-l-4 border-white rounded-bl-xl shadow-md" />
                <div className="w-9 h-9 border-b-4 border-r-4 border-white rounded-br-xl shadow-md" />
              </div>
            </div>

            {/* Hint Badge */}
            <div className="absolute bottom-4 px-4 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-center text-[11px] font-medium text-white/90 border border-white/10 flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Pastikan makanan terlihat jelas dan fokus dengan baik</span>
            </div>
          </div>

          {/* Preset Buttons & Upload Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-semibold">
                Pilih Sampel Hidangan Cepat:
              </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Unggah Foto dari Perangkat</span>
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {PRESET_SCAN_ITEMS.map((item, idx) => (
                <button
                  key={item.name}
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedPresetIdx === idx && !useWebcam
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Scan Action Button */}
            <button
              onClick={handleTriggerAnalysis}
              disabled={isScanning}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Menganalisis Makanan dengan AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Mulai Analisis AI Sekarang</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Analysis Result (Screen 5 representation, 5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Hasil Analisis Nutrisi</span>
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-700 border border-emerald-200/50">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Dianalisis dengan AI</span>
            </span>
          </div>

          {/* Dish Header Info */}
          <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <img
              src={activeItem.image}
              alt={activeItem.name}
              className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-200/80 shadow-2xs"
            />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">{activeItem.name}</h4>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeItem.portion}</span>
              </div>
            </div>
          </div>

          {/* Calorie Donut Gauge */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
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
                <span className="text-2xl font-black text-slate-900 leading-none">
                  {activeItem.calories}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">kkal</span>
                <span className="text-[9px] text-slate-400">Total Kalori</span>
              </div>
            </div>

            {/* Macro Stats */}
            <div className="space-y-2 text-xs pr-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600 font-medium w-20">Protein</span>
                <span className="font-bold text-slate-900">{activeItem.protein} g</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600 font-medium w-20">Karbohidrat</span>
                <span className="font-bold text-slate-900">{activeItem.carbs} g</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600 font-medium w-20">Lemak</span>
                <span className="font-bold text-slate-900">{activeItem.fat} g</span>
              </div>
            </div>
          </div>

          {/* Rincian Gizi (Micronutrients) */}
          <div className="border border-slate-100 rounded-2xl p-4 space-y-2 text-xs">
            <h5 className="font-bold text-slate-900 text-xs tracking-tight">Rincian Gizi Mikro</h5>
            <div className="divide-y divide-slate-100">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Serat Pangan</span>
                <span className="font-semibold text-slate-800">{activeItem.fiber} g</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Gula</span>
                <span className="font-semibold text-slate-800">{activeItem.sugar} g</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Natrium / Sodium</span>
                <span className="font-semibold text-slate-800">{activeItem.sodium} mg</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleSave}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                isSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tersimpan di Riwayat & Dashboard!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Simpan ke Riwayat Makanan</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                const nextIdx = (selectedPresetIdx + 1) % PRESET_SCAN_ITEMS.length;
                handleSelectPreset(nextIdx);
              }}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Coba Makanan Lain</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
