'use client';

import React from 'react';
import { Home, Sparkles, Image as ImageIcon, Clock, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: Sparkles, label: 'Generate', id: 'generate', active: true },
  { icon: ImageIcon, label: 'Brand Assets', id: 'assets' },
  { icon: Clock, label: 'History', id: 'history' },
];

const secondaryItems = [
  { icon: HelpCircle, label: 'Support', id: 'support' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white h-[calc(100vh-64px)] flex flex-col justify-between py-8">
      <nav className="px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200",
              item.active 
                ? "bg-slate-50 text-[#021a5a] border border-slate-200" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <item.icon className={cn("w-4.5 h-4.5", item.active ? "text-[#007cd8]" : "text-slate-400")} />
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-4 space-y-6">
        <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-4 space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Power User Plan</p>
          <button className="w-full bg-[#021a5a] text-white text-[11px] font-bold py-2.5 rounded-lg hover:bg-[#03247c] transition-colors shadow-sm">
            UPGRADE PRO
          </button>
        </div>

        <div className="space-y-0.5">
          {secondaryItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all text-sm font-medium"
            >
              <item.icon className="w-4 h-4 text-slate-400" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
