import React, { useState } from 'react';
import { Bell, Calendar, Plus, Menu } from 'lucide-react';
import { WebTab } from './Sidebar';
import { UserProfile } from '../../types';

interface TopHeaderProps {
  activeTab: WebTab;
  user: UserProfile;
  onOpenManualModal: () => void;
  onToggleMobileMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  user,
  onOpenManualModal,
  onToggleMobileMenu,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const tabTitles: Record<WebTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Dashboard Nutrisi',
      subtitle: `Halo, ${user.name}! Pantau konsumsi kalori dan target nutrisimu hari ini.`,
    },
    scan: {
      title: 'Scan Makanan dengan AI',
      subtitle: 'Arahkan kamera atau unggah foto untuk menghitung kalori & makronutrisi secara instan.',
    },
    history: {
      title: 'Riwayat Makanan',
      subtitle: 'Telusuri catatan asupan makanan, porsi, dan rincian nutrisi harianmu.',
    },
    profile: {
      title: 'Profil & Target Nutrisi',
      subtitle: 'Sesuaikan target kalori harian, rasio makro, dan preferensi akun.',
    },
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0 select-none">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
            {tabTitles[activeTab].title}
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            {tabTitles[activeTab].subtitle}
          </p>
        </div>
      </div>

      {/* Right: Date, Quick Add, Notifications */}
      <div className="flex items-center gap-3">
        {/* Date badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Jumat, 9 Oktober 2026</span>
        </div>

        {/* Quick Add Manual Food */}
        <button
          onClick={onOpenManualModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Catat Manual</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 relative transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3.5 z-50 text-xs">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                <span className="font-bold text-slate-800">Notifikasi</span>
                <span className="text-[10px] text-blue-600 font-medium">Tandai Dibaca</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50/60 rounded-xl">
                  <p className="font-semibold text-blue-900 text-[11px]">Pengingat Makan Siang</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Jangan lupa catat menu makan siangmu untuk menjaga target 2.000 kkal.
                  </p>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <p className="font-semibold text-slate-800 text-[11px]">Target Protein Tercapai 56%</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Sudah 68g dari 120g protein terpenuhi hari ini.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
