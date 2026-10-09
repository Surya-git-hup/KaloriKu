import React from 'react';
import {
  LayoutDashboard,
  Camera,
  History,
  User,
  PlusCircle,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { KaloriKuLogo } from '../KaloriKuLogo';
import { UserProfile } from '../../types';

export type WebTab = 'dashboard' | 'scan' | 'history' | 'profile';

interface SidebarProps {
  activeTab: WebTab;
  onSelectTab: (tab: WebTab) => void;
  user: UserProfile;
  onOpenAuth: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  user,
  onOpenAuth,
}) => {
  const navItems = [
    {
      id: 'dashboard' as WebTab,
      label: 'Dashboard Nutrisi',
      icon: LayoutDashboard,
    },
    {
      id: 'scan' as WebTab,
      label: 'Scan Makanan AI',
      icon: Camera,
      highlight: true,
    },
    {
      id: 'history' as WebTab,
      label: 'Riwayat Makanan',
      icon: History,
    },
    {
      id: 'profile' as WebTab,
      label: 'Profil & Target',
      icon: User,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none">
      {/* Top Brand Section */}
      <div>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <KaloriKuLogo size="sm" />
            <div>
              <p className="text-[11px] text-slate-400 font-medium leading-none mt-1">
                Jaga Pola Makan Sehat
              </p>
            </div>
          </div>
        </div>

        {/* Quick CTA button */}
        <div className="p-4 pb-2">
          <button
            onClick={() => onSelectTab('scan')}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Pindai Makanan Sekarang</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.highlight && !isActive && (
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile & Account Switch */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between">
          <div
            onClick={() => onSelectTab('profile')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-full ring-2 ring-white shadow-2xs overflow-hidden bg-blue-100 flex items-center justify-center">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
              <p className="text-[11px] text-slate-400 truncate max-w-[110px]">{user.email}</p>
            </div>
          </div>

          <button
            onClick={onOpenAuth}
            title="Keluar / Ganti Akun"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
