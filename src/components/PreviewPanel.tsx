'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ZoomIn, Download as DownloadIcon, 
  Layout, Smartphone, Monitor,
  Sparkles, ShieldCheck, Zap,
  ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreativeData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';

// Direct imports for reliable asset rendering
import BlueLogo from '../app/images/Blue_Logo.svg';
import IconHiring from '../app/images/icon_hiring.svg';
import HiringBg from '../app/images/hiring_bg.png';

interface PreviewPanelProps {
  imageUrl: string | null;
  isGenerating: boolean;
  data: CreativeData | null;
}

const platforms = [
  { id: 'linkedin', label: 'LinkedIn', icon: Layout, aspect: 'aspect-square' },
  { id: 'portrait', label: 'Portrait', icon: Smartphone, aspect: 'aspect-[9/16]' },
  { id: 'landscape', label: 'Landscape', icon: Monitor, aspect: 'aspect-[16/9]' },
];

export default function PreviewPanel({ imageUrl, isGenerating, data }: PreviewPanelProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('linkedin');
  const [loadingStep, setLoadingStep] = useState(0);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 3);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      const dataUrl = await toPng(posterRef.current, { quality: 1, pixelRatio: 2 });
      const link = document.createElement('a');
      const roleName = data?.role?.replace(/\s+/g, '_') || 'Creative';
      link.download = `Hiring_${roleName}_Abilytics.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  const currentPlatform = platforms.find(p => p.id === selectedPlatform) || platforms[0];
  const pointCount = data?.points?.length || 0;

  return (
    <div className="flex-1 flex flex-col h-full space-y-6">
      {/* Top Bar: Controls */}
      <div className="flex items-center justify-between">
        <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-1">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                selectedPlatform === p.id 
                  ? "bg-white text-[#021a5a] shadow-sm border border-slate-200" 
                  : "text-slate-400 hover:text-slate-900"
              )}
            >
              <p.icon className="w-3 h-3" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 shadow-sm transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDownload}
            disabled={isGenerating || !data}
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#021a5a] hover:bg-[#03247c] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-md disabled:opacity-50"
          >
            <DownloadIcon className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-[#f8fafc] border border-slate-200 rounded-2xl relative flex flex-col items-center justify-start p-12 overflow-hidden shadow-inner min-h-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-6 z-10 pt-40"
            >
              <div className="w-16 h-16 border-4 border-slate-100 border-t-[#007cd8] rounded-full animate-spin shadow-sm" />
              <div className="flex flex-col items-center space-y-1">
                <span className="text-[10px] font-bold text-[#007cd8] uppercase tracking-[0.2em] animate-pulse">
                   Applying brand system...
                </span>
              </div>
            </motion.div>
          ) : !data ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center space-y-4 text-slate-300 pt-40"
            >
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
                <ImageIcon className="w-8 h-8" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Your generated poster will appear here</p>
            </motion.div>
          ) : (
            <motion.div
              key="poster"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "relative w-full max-w-2xl shadow-2xl transition-all duration-500 bg-white ring-1 ring-slate-200 mt-10",
                currentPlatform.aspect
              )}
            >
              <div ref={posterRef} className="absolute inset-0 overflow-hidden bg-white flex flex-col">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                  {data?.creativeType === 'hiring' ? (
                    <img src={HiringBg.src} alt="Background" className="w-full h-full object-cover" />
                  ) : imageUrl ? (
                    <img src={imageUrl} alt="Background" className="w-full h-full object-cover" />
                  ) : null}
                </div>
                
                {data?.creativeType === 'hiring' ? (
                  <div className="flex-1 flex flex-col p-8 font-['Poppins'] relative z-10 overflow-hidden">
                    <div className="flex justify-between items-start mb-4 flex-shrink-0">
                      <h1 className="text-2xl font-extrabold tracking-tight whitespace-nowrap bg-gradient-to-r from-[#00b15c] to-[#007cd8] bg-clip-text text-transparent">
                        {data.headline || "Hiring - Immediate"}
                      </h1>
                      <div className="w-28 h-8 flex items-center justify-end">
                        <img src={BlueLogo.src} alt="Abilytics" className="max-w-full max-h-full object-contain" />
                      </div>
                    </div>

                    <div className="mb-2 flex-shrink-0">
                      <h2 className={cn(
                        "font-bold text-[#021a5a] tracking-tight leading-tight",
                        pointCount > 4 ? "text-[20px]" : "text-[21px]"
                      )}>
                        {data.role || "Business Development Associate"}
                      </h2>
                    </div>

                    <p className={cn(
                      "text-[#021a5a]/90 font-normal leading-tight flex-shrink-0 max-w-[95%]",
                      pointCount > 4 ? "text-[11px] mb-3" : "text-[12.5px] mb-4"
                    )}>
                      {data.subheadline || "Abilytics is hiring for this position to support AI-focused growth."}
                    </p>

                    <div className="flex-1 flex flex-col justify-between min-h-0 mb-10">
                      {(data.points || []).slice(0, 5).map((point, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <img src={IconHiring.src} alt="Icon" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                          <p className={cn(
                            "font-semibold text-[#021a5a] leading-snug",
                            pointCount > 4 ? "text-[11px]" : "text-[12px]"
                          )}>{point}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#021a5a]/10 pt-4 mt-auto flex-shrink-0">
                      <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-medium text-[#021a5a]">
                            <span className="text-[#00b15c] font-bold">Experience:</span> {data.experience || ""}
                          </p>
                          <p className="text-[10px] font-medium text-[#021a5a]">
                            <span className="text-[#00b15c] font-bold">Location:</span> {data.location || ""}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="bg-[#007cd8] text-white px-6 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest mb-1.5 shadow-sm whitespace-nowrap inline-block">
                            {data.cta || "send resume"}
                          </div>
                          <p className="text-[8px] font-bold text-[#021a5a] opacity-60">
                            {data.email || "hr@abilytics.com"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 flex flex-col justify-between p-10 z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-24 h-12 bg-white/20 backdrop-blur rounded-lg p-3 flex items-center justify-center overflow-hidden border border-white/20">
                        <img src={BlueLogo.src} alt="Logo" className="max-w-full max-h-full object-contain invert brightness-0" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                        {data?.headline || "Creative Intelligence"}
                      </h2>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
