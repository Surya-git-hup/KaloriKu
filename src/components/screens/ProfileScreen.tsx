import React, { useState } from 'react';
import {
  Settings,
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
  ChevronRight,
  X,
  Check,
} from 'lucide-react';
import { ScreenId, UserProfile } from '../../types';
import { BottomNavBar } from '../BottomNavBar';

interface ProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateUser,
  onNavigate,
  onLogout,
}) => {
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [targetCalories, setTargetCalories] = useState(user.targetCalories);
  const [targetProtein, setTargetProtein] = useState(user.targetProtein);
  const [targetCarbs, setTargetCarbs] = useState(user.targetCarbs);
  const [targetFat, setTargetFat] = useState(user.targetFat);

  const [notificationState, setNotificationState] = useState(user.notifications);
  const [reminderState, setReminderState] = useState(user.mealReminder);

  const handleSaveTarget = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      targetCalories: Number(targetCalories),
      targetProtein: Number(targetProtein),
      targetCarbs: Number(targetCarbs),
      targetFat: Number(targetFat),
    });
    setIsEditingTarget(false);
  };

  const cycleReminder = () => {
    const options = ['1x sehari', '2x sehari', '3x sehari', '4x sehari'];
    const nextIdx = (options.indexOf(reminderState) + 1) % options.length;
    const nextVal = options[nextIdx];
    setReminderState(nextVal);
    onUpdateUser({ mealReminder: nextVal });
  };

  const toggleNotifications = () => {
    const nextVal = !notificationState;
    setNotificationState(nextVal);
    onUpdateUser({ notifications: nextVal });
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50/60 overflow-hidden relative">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 no-scrollbar">
        {/* Header with settings icon */}
        <div className="flex items-center justify-end mb-2">
          <button
            onClick={() => alert('Pengaturan akun KaloriKu v1.0.0')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200/60 active:scale-95 transition-all cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* User Info Avatar & Name */}
        <div className="flex flex-col items-center text-center -mt-2 mb-4">
          <div className="w-20 h-20 rounded-full ring-4 ring-white shadow-md overflow-hidden relative bg-blue-100 flex items-center justify-center mb-2">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback to SVG avatar if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">{user.name}</h2>
          <p className="text-xs text-slate-400 font-medium">{user.email}</p>
        </div>

        {/* Target Nutrisi Harian Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">Target Nutrisi Harian</h3>
            <button
              onClick={() => setIsEditingTarget(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Kalori */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-1 shadow-2xs">
                <Flame className="w-4 h-4 fill-orange-500" />
              </div>
              <span className="text-xs font-bold text-slate-800">{user.targetCalories.toLocaleString('id-ID')}</span>
              <span className="text-[10px] text-slate-400">kkal</span>
            </div>

            {/* Protein */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1 shadow-2xs">
                <Dumbbell className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-slate-800">{user.targetProtein} g</span>
              <span className="text-[10px] text-slate-400">Protein</span>
            </div>

            {/* Karbohidrat */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1 shadow-2xs">
                <Leaf className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-slate-800">{user.targetCarbs} g</span>
              <span className="text-[10px] text-slate-400">Karbohidrat</span>
            </div>

            {/* Lemak */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-1 shadow-2xs">
                <Droplets className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-slate-800">{user.targetFat} g</span>
              <span className="text-[10px] text-slate-400">Lemak</span>
            </div>
          </div>
        </div>

        {/* Menu Navigation List */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden divide-y divide-slate-100">
          {/* Pengingat Makan */}
          <button
            onClick={cycleReminder}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold">Pengaturan Pengingat Makan</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="font-medium text-slate-500">{reminderState}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
            </div>
          </button>

          {/* Notifikasi */}
          <button
            onClick={toggleNotifications}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <Bell className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold">Notifikasi</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="font-medium text-slate-500">
                {notificationState ? 'Aktif' : 'Nonaktif'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
            </div>
          </button>

          {/* Tema */}
          <button
            onClick={() => alert('Mode tema Gelap segera hadir!')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <Sun className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold">Tema</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="font-medium text-slate-500">{user.theme}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
            </div>
          </button>

          {/* Bahasa */}
          <button
            onClick={() => alert('Aplikasi saat ini berbahasa Indonesia')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold">Bahasa</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="font-medium text-slate-500">{user.language}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
            </div>
          </button>

          {/* Bantuan */}
          <button
            onClick={() => alert('Pusat Bantuan KaloriKu: hubungi support@kaloriku.id')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold">Bantuan & Pusat Dukungan</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
          </button>

          {/* Tentang */}
          <button
            onClick={() =>
              alert('KaloriKu v1.0.0 - Aplikasi Pemantau Nutrisi & Kalori Cerdas dengan AI')
            }
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <Info className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold">Tentang KaloriKu</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
          </button>

          {/* Keluar */}
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-red-50/50 transition-colors group cursor-pointer text-red-600"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="text-xs font-semibold">Keluar</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-300 group-hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Target Nutrisi Modal */}
      {isEditingTarget && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Ubah Target Nutrisi Harian</h3>
              <button
                onClick={() => setIsEditingTarget(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTarget} className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Target Kalori (kkal)
                </label>
                <input
                  type="number"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={targetProtein}
                    onChange={(e) => setTargetProtein(Number(e.target.value))}
                    className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                    Karbo (g)
                  </label>
                  <input
                    type="number"
                    value={targetCarbs}
                    onChange={(e) => setTargetCarbs(Number(e.target.value))}
                    className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                    Lemak (g)
                  </label>
                  <input
                    type="number"
                    value={targetFat}
                    onChange={(e) => setTargetFat(Number(e.target.value))}
                    className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingTarget(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNavBar currentScreen="profile" onNavigate={onNavigate} />
    </div>
  );
};
