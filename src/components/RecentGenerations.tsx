'use client';

import React from 'react';
import { ChevronRight, Clock, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockGenerations = [
  {
    id: '1',
    title: 'Hiring Poster',
    time: '2 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&h=250&auto=format&fit=crop',
    type: 'hiring'
  },
  {
    id: '2',
    title: 'Webinar Banner',
    time: 'Yesterday',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&h=250&auto=format&fit=crop',
    type: 'webinar'
  },
  {
    id: '3',
    title: 'Product Launch',
    time: '3 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&h=250&auto=format&fit=crop',
    type: 'launch'
  }
];

export default function RecentGenerations() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Generations</h3>
        <button className="flex items-center space-x-1 text-[10px] font-bold text-[#007cd8] hover:text-[#021a5a] transition-colors uppercase tracking-[0.1em] group">
          <span>View History</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-6 custom-scrollbar px-2">
        {mockGenerations.map((item) => (
          <div 
            key={item.id} 
            className="flex-shrink-0 w-72 bg-white border border-slate-200 rounded-xl p-3 space-y-4 group cursor-pointer hover:border-[#007cd8] hover:shadow-md transition-all duration-300"
          >
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden ring-1 ring-slate-100">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg bg-white/90 backdrop-blur shadow-sm text-slate-500 hover:text-slate-900 transition-all border border-slate-200">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="px-1 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#007cd8] transition-colors">{item.title}</h4>
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-1 font-semibold uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </div>
              </div>
              <div className={cn(
                "w-2 h-2 rounded-full",
                item.type === 'hiring' ? 'bg-[#007cd8]' : item.type === 'webinar' ? 'bg-[#00b15c]' : 'bg-orange-500'
              )} />
            </div>
          </div>
        ))}
        
        {/* Empty state slots */}
        <div className="flex-shrink-0 w-72 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center group hover:border-[#007cd8] hover:bg-slate-50 transition-all">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-full border border-slate-200 mx-auto flex items-center justify-center group-hover:bg-white transition-colors">
              <span className="text-slate-300 text-xl font-bold">+</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New generation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
