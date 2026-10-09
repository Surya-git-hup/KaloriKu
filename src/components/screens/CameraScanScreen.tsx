import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Zap, ZapOff, Settings, Image as ImageIcon, CheckCircle, Camera, Sparkles } from 'lucide-react';
import { FoodItem, ScreenId } from '../../types';
import { PRESET_SCAN_ITEMS } from '../../data/foodData';

interface CameraScanScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onScanComplete: (scannedItem: Omit<FoodItem, 'id' | 'timeAgo' | 'timestamp'>) => void;
}

export const CameraScanScreen: React.FC<CameraScanScreenProps> = ({
  onNavigate,
  onScanComplete,
}) => {
  const [flashOn, setFlashOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [cameraMode, setCameraMode] = useState<'sample' | 'webcam'>('sample');
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeDish = PRESET_SCAN_ITEMS[selectedPresetIndex];

  // Optional real webcam support
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (cameraMode === 'webcam') {
      navigator.mediaDevices
        ?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setWebcamActive(true);
          }
        })
        .catch(() => {
          setCameraMode('sample');
          setWebcamActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraMode]);

  const handleCapture = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScanComplete(activeDish);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        onScanComplete({
          name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Makanan Baru',
          portion: '1 porsi (200 g)',
          calories: 385,
          protein: 24,
          carbs: 42,
          fat: 14,
          fiber: 4,
          sugar: 5,
          sodium: 290,
          image: imageUrl,
          analyzedWithAi: true,
          category: 'Makan Siang',
        });
      }, 1200);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-black text-white overflow-hidden relative select-none">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Top Camera Navigation */}
      <div className="w-full pt-3 px-5 pb-2 flex items-center justify-between z-30 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => onNavigate('home')}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
          Scan Makanan
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlashOn(!flashOn)}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
              flashOn ? 'bg-amber-400 text-slate-900 shadow-md shadow-amber-400/50' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {flashOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              setCameraMode(cameraMode === 'sample' ? 'webcam' : 'sample');
            }}
            title={cameraMode === 'sample' ? 'Gunakan Kamera Fisik' : 'Gunakan Foto Sampel'}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Viewfinder Center */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden my-1">
        {/* Real camera video feed or Dish photo */}
        {cameraMode === 'webcam' && webcamActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full relative">
            <img
              src={activeDish.image}
              alt={activeDish.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />
          </div>
        )}

        {/* Viewfinder Corners (Target Box) */}
        <div className="absolute w-72 h-72 pointer-events-none flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-10 h-10 border-t-4 border-l-4 border-white rounded-tl-2xl shadow-sm" />
            <div className="w-10 h-10 border-t-4 border-r-4 border-white rounded-tr-2xl shadow-sm" />
          </div>

          {/* AI Scanning Beam Line */}
          {isScanning && (
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse my-auto" />
          )}

          <div className="flex justify-between">
            <div className="w-10 h-10 border-b-4 border-l-4 border-white rounded-bl-2xl shadow-sm" />
            <div className="w-10 h-10 border-b-4 border-r-4 border-white rounded-br-2xl shadow-sm" />
          </div>
        </div>

        {/* Instruction Floating Banner */}
        <div className="absolute bottom-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/15 text-center text-[11px] font-medium text-white/90 shadow-lg flex items-center gap-1.5 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Pastikan makanan terlihat jelas dan fokus dengan baik</span>
        </div>

        {/* Preset Meal Picker Slider */}
        <div className="absolute top-2 left-0 right-0 flex justify-center gap-1.5 px-4 overflow-x-auto no-scrollbar z-20">
          {PRESET_SCAN_ITEMS.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedPresetIndex(idx);
                setCameraMode('sample');
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all backdrop-blur-md cursor-pointer ${
                selectedPresetIndex === idx && cameraMode === 'sample'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                  : 'bg-black/50 text-white/70 hover:bg-black/70'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Camera Controls Bar */}
      <div className="w-full pt-3 pb-6 px-8 bg-black/90 flex items-center justify-between z-30">
        {/* Galeri Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-1 text-white/80 hover:text-white group active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">Galeri</span>
        </button>

        {/* Main Capture Shutter Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleCapture}
            disabled={isScanning}
            className="w-18 h-18 rounded-full border-4 border-white/80 p-1 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer group"
          >
            <div
              className={`w-full h-full rounded-full transition-all ${
                isScanning ? 'bg-cyan-400 animate-spin' : 'bg-white group-hover:bg-slate-100'
              }`}
            />
          </button>
        </div>

        {/* Quick Analisis Button */}
        <button
          onClick={handleCapture}
          disabled={isScanning}
          className="flex flex-col items-center gap-1 text-white/80 hover:text-white group active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">Analisis</span>
        </button>
      </div>
    </div>
  );
};
