import React, { useState } from 'react';
import {
  Flame,
  Dumbbell,
  Leaf,
  Droplets,
  Clock,
  Bell,
  Sun,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { UserProfile } from '../../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (u: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  onLogout,
}) => {
  const [targetCalories, setTargetCalories] = useState(user.targetCalories);
  const [targetProtein, setTargetProtein] = useState(user.targetProtein);
  const [targetCarbs, setTargetCarbs] = useState(user.targetCarbs);
  const [targetFat, setTargetFat] = useState(user.targetFat);
  const [mealReminder, setMealReminder] = useState(user.mealReminder);
  const [notifications, setNotifications] = useState(user.notifications);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveTargets = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      targetCalories: Number(targetCalories),
      targetProtein: Number(targetProtein),
      targetCarbs: Number(targetCarbs),
      targetFat: Number(targetFat),
      mealReminder,
      notifications,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const cycleReminder = () => {
    const list = ['1x sehari', '2x sehari', '3x sehari', '4x sehari'];
    const idx = (list.indexOf(mealReminder) + 1) % list.length;
    setMealReminder(list[idx]);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* User Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl ring-4 ring-blue-50 shadow-sm overflow-hidden bg-blue-100 flex items-center justify-center shrink-0">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{user.name}</h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                Member Sehat
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Bergabung sejak Oktober 2026 · Target Aktif: 2.000 kkal/hari
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Akun</span>
        </button>
      </div>

      {/* Target Nutrisi Form Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Target Nutrisi Harian
            </h3>
            <p className="text-xs text-slate-400">
              Sesuaikan batas kalori dan pembagian makronutrisi harian Anda
            </p>
          </div>
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Target berhasil diperbarui!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSaveTargets} className="mt-5 space-y-6">
          {/* Calorie Target */}
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Target Kalori Harian (kkal)</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="800"
                max="5000"
                step="50"
                value={targetCalories}
                onChange={(e) => setTargetCalories(Number(e.target.value))}
                className="w-48 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 tabular-nums"
                required
              />
              <span className="text-xs text-slate-400">
                Standar rekomendasi diet seimbang: 1.800 – 2.400 kkal/hari
              </span>
            </div>
          </div>

          {/* 3 Macros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-slate-100">
            {/* Protein */}
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-2">
                <Dumbbell className="w-4 h-4 text-blue-600" />
                <span>Target Protein (g)</span>
              </label>
              <input
                type="number"
                min="20"
                max="300"
                value={targetProtein}
                onChange={(e) => setTargetProtein(Number(e.target.value))}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500 tabular-nums"
                required
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                ≈ {targetProtein * 4} kkal ({Math.round(((targetProtein * 4) / targetCalories) * 100)}% dari total)
              </span>
            </div>

            {/* Karbohidrat */}
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Target Karbohidrat (g)</span>
              </label>
              <input
                type="number"
                min="50"
                max="600"
                value={targetCarbs}
                onChange={(e) => setTargetCarbs(Number(e.target.value))}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500 tabular-nums"
                required
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                ≈ {targetCarbs * 4} kkal ({Math.round(((targetCarbs * 4) / targetCalories) * 100)}% dari total)
              </span>
            </div>

            {/* Lemak */}
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-amber-500" />
                <span>Target Lemak (g)</span>
              </label>
              <input
                type="number"
                min="10"
                max="150"
                value={targetFat}
                onChange={(e) => setTargetFat(Number(e.target.value))}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500 tabular-nums"
                required
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                ≈ {targetFat * 9} kkal ({Math.round(((targetFat * 9) / targetCalories) * 100)}% dari total)
              </span>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Simpan Perubahan Target</span>
            </button>
          </div>
        </form>
      </div>

      {/* Preferences & Settings */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {/* Reminder */}
        <div
          onClick={cycleReminder}
          className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Pengaturan Pengingat Makan</p>
              <p className="text-[11px] text-slate-400">Jadwal notifikasi pengingat sarapan & makan</p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
            {mealReminder}
          </span>
        </div>

        {/* Notifikasi */}
        <div
          onClick={() => setNotifications(!notifications)}
          className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Notifikasi Aplikasi</p>
              <p className="text-[11px] text-slate-400">Terima pemberitahuan progres target kalori</p>
            </div>
          </div>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-lg ${
              notifications ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-100'
            }`}
          >
            {notifications ? 'Aktif' : 'Nonaktif'}
          </span>
        </div>

        {/* Tema */}
        <div className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <Sun className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Tema Tampilan</p>
              <p className="text-[11px] text-slate-400">Pengaturan tema visual aplikasi</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-600">Terang (Default)</span>
        </div>

        {/* Bahasa */}
        <div className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Bahasa</p>
              <p className="text-[11px] text-slate-400">Bahasa antarmuka web KaloriKu</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-600">Bahasa Indonesia</span>
        </div>

        {/* Bantuan */}
        <div
          onClick={() => alert('Pusat Bantuan: hubungi support@kaloriku.id')}
          className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Bantuan & Pusat Dukungan</p>
              <p className="text-[11px] text-slate-400">Pertanyaan umum, panduan nutrisi, dan kontak</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">support@kaloriku.id →</span>
        </div>

        {/* Tentang */}
        <div className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <Info className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Tentang KaloriKu</p>
              <p className="text-[11px] text-slate-400">Versi 2.0 Web Application AI Nutrition Platform</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-400">v2.0.0</span>
        </div>
      </div>
    </div>
  );
};
