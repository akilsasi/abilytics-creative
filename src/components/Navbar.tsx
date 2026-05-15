'use client';

import React from 'react';
import { Bell, Settings, User, Database } from 'lucide-react';
import LogoCreative from '../app/images/Logo_Creative.svg';

export default function Navbar() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center h-full">
        <div className="h-10 flex items-center">
          <img 
            src={LogoCreative.src} 
            alt="Abilytics Creative Studio" 
            className="h-full w-auto object-contain"
          />
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        {/* Navigation links removed for focused workspace */}
      </nav>

      <div className="flex items-center space-x-6">
        
        <div className="flex items-center space-x-4">
          <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full border border-slate-200 p-[1px] bg-slate-50 flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
