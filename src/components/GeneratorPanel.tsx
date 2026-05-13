'use client';

import React, { useState } from 'react';
import { Input, Button, Slider } from './ui';
import { UploadZone } from './ui/UploadZone';
import { Briefcase, Video, Heart, Rocket, Sparkles, Plus, X, ChevronDown, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreativeType, CreativeData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const creativeTypes = [
  { id: 'hiring', label: 'Hiring', icon: Briefcase, color: 'text-[#007cd8]' },
  { id: 'webinar', label: 'Webinar', icon: Video, color: 'text-[#00b15c]' },
  { id: 'womensDay', label: "Women's Day", icon: Heart, color: 'text-pink-500' },
  { id: 'launch', label: 'Launch', icon: Rocket, color: 'text-orange-500' },
] as const;

interface GeneratorPanelProps {
  onGenerate: (data: CreativeData) => void;
  isGenerating: boolean;
}

export default function GeneratorPanel({ onGenerate, isGenerating }: GeneratorPanelProps) {
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [isParsing, setIsParsing] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  
  const [data, setData] = useState<CreativeData>({
    websiteUrl: 'https://abilytics.ai',
    brandColors: ['#021a5a', '#00b15c', '#007cd8'],
    creativeType: 'hiring',
    headline: 'Hiring - Immediate',
    subheadline: '',
    cta: 'send resume',
    hashtags: '#Abilytics #AI #Hiring',
    style: {
      creativityLevel: 30,
      brandStrictness: 95,
    },
    email: 'syno.k@abilytics.com',
    location: 'Bangalore / Remote | US overlap hours',
    experience: '0–1 year',
    points: [
      "Prospect target companies through cold calls, emails, and LinkedIn outreach",
      "Research accounts, personalize messaging, and book qualified meetings.",
      "Work closely with founders, sales, and marketing teams on GTM initiatives."
    ]
  });

  const runAnalysis = () => {
    setIsParsing(true);
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        role: 'Business Development Associate',
        headline: 'Hiring - Immediate',
        subheadline: 'Abilytics is hiring a Business Development Associate to support outbound sales, pipeline generation, and AI-focused business growth.',
        points: [
          "Prospect target companies through cold calls, emails, and LinkedIn outreach",
          "Research accounts, personalize messaging, and book qualified meetings.",
          "Work closely with founders, sales, and marketing teams on GTM initiatives.",
          "Learn and position AI, cloud, analytics, and engineering solutions.",
          "Support pipeline growth across US-market outreach campaigns."
        ],
        experience: '0–1 year',
        location: 'Bangalore / Remote | US overlap hours',
        email: 'syno.k@abilytics.com',
        cta: 'send resume'
      }));
      setIsParsing(false);
    }, 1500);
  };

  const handleUpdatePoint = (index: number, value: string) => {
    const newPoints = [...(data.points || [])];
    newPoints[index] = value;
    setData({ ...data, points: newPoints });
  };

  const handleRemovePoint = (index: number) => {
    const newPoints = (data.points || []).filter((_, i) => i !== index);
    setData({ ...data, points: newPoints });
  };

  const handleAddPoint = () => {
    setData({ ...data, points: [...(data.points || []), ''] });
  };

  const currentType = creativeTypes.find(t => t.id === data.creativeType) || creativeTypes[0];

  return (
    <div className="flex-1 max-w-xl h-full overflow-y-auto pr-4 custom-scrollbar">
      <div className="space-y-10 pb-12">
        {/* HEADER & TYPE DROPDOWN */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Design Professional Graphics</h2>
            <p className="text-slate-400 text-xs font-medium">Generate and refine brand-ready assets instantly.</p>
          </div>

          <div className="relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">Asset Category</label>
            <button 
              onClick={() => setIsTypeOpen(!isTypeOpen)}
              className="w-full bg-white border border-slate-200 rounded-xl px-6 py-4 flex items-center justify-between group hover:border-[#007cd8] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:scale-105 transition-transform">
                  <currentType.icon className={cn("w-5 h-5", currentType.color)} />
                </div>
                <span className="text-sm font-bold text-slate-900">{currentType.label}</span>
              </div>
              <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isTypeOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isTypeOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl overflow-hidden z-50 shadow-2xl"
                >
                  {creativeTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setData({ ...data, creativeType: type.id });
                        setIsTypeOpen(false);
                      }}
                      className={cn(
                        "w-full px-6 py-4 flex items-center space-x-4 hover:bg-slate-50 transition-colors text-left",
                        data.creativeType === type.id && "bg-slate-50"
                      )}
                    >
                      <type.icon className={cn("w-5 h-5", type.color)} />
                      <span className="text-sm font-semibold text-slate-900">{type.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* SECTION 1: JOB DESCRIPTION INPUT */}
        <section className="space-y-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#007cd8]" />
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Source Content</h3>
            </div>
            <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
              {['upload', 'paste'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setInputMode(tab as 'upload' | 'paste')}
                  className={cn(
                    "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer",
                    inputMode === tab ? "bg-white text-[#021a5a] shadow-sm border border-slate-200" : "text-slate-400 hover:text-slate-900"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          {inputMode === 'upload' ? (
            <UploadZone 
              label="Click to upload Requirement Doc" 
              onUpload={runAnalysis} 
              icon="upload"
              multiple={false}
            />
          ) : (
            <div className="space-y-2">
              <textarea 
                className="w-full h-32 bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#007cd8] focus:ring-4 focus:ring-[#007cd8]/5 hover:shadow-md transition-all custom-scrollbar resize-none"
                placeholder="Paste JD text here to auto-populate fields..."
                onChange={(e) => e.target.value.length > 50 && runAnalysis()}
              />
            </div>
          )}

          {isParsing && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-3 py-4 bg-slate-50 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="w-4 h-4 border-2 border-[#007cd8] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-[#007cd8] animate-pulse uppercase tracking-wider">AI Studio Processing...</span>
            </motion.div>
          )}
        </section>

        {/* SECTION 2: BRAND IDENTITY */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00b15c]" />
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Visual Identity</h3>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Brand Palette</label>
            <div className="flex flex-wrap gap-4">
              {data.brandColors.map((color, i) => (
                <div key={i} className="relative group">
                  <div 
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer hover:scale-105 transition-all shadow-sm overflow-hidden"
                    style={{ backgroundColor: color }}
                  >
                    <input 
                      type="color" 
                      value={color}
                      onChange={(e) => {
                        const newColors = [...data.brandColors];
                        newColors[i] = e.target.value;
                        setData({ ...data, brandColors: newColors });
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer scale-150"
                    />
                  </div>
                  <button 
                    onClick={() => {
                        const newColors = data.brandColors.filter((_, idx) => idx !== i);
                        setData({ ...data, brandColors: newColors });
                    }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-100 group-hover:scale-110 shadow-sm"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setData({ ...data, brandColors: [...data.brandColors, '#3b82f6'] })}
                className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:text-[#007cd8] hover:border-[#007cd8] hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: EDITABLE CONTENT */}
        <section className="space-y-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#021a5a]" />
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Editable Poster Content</h3>
            </div>
            <div className="flex items-center space-x-1.5 text-[9px] font-bold text-[#007cd8] uppercase tracking-widest bg-[#007cd8]/5 px-2 py-1 rounded">
               <Edit3 className="w-2.5 h-2.5" />
               <span>Ready for edits</span>
            </div>
          </div>

          <div className="space-y-5">
            <Input 
              label="Main Headline" 
              value={data.headline}
              className="bg-white hover:shadow-md focus:ring-4 focus:ring-[#007cd8]/5 transition-all"
              onChange={(e) => setData({ ...data, headline: e.target.value })}
            />
            <Input 
              label="Job Role / Position" 
              value={data.role || ''}
              className="bg-white hover:shadow-md focus:ring-4 focus:ring-[#007cd8]/5 transition-all"
              onChange={(e) => setData({ ...data, role: e.target.value })}
            />
            <div className="space-y-2 group">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Introduction / Description</label>
              <textarea 
                className="w-full h-24 bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-[#007cd8] focus:ring-4 focus:ring-[#007cd8]/5 hover:shadow-md transition-all custom-scrollbar resize-none"
                value={data.subheadline}
                onChange={(e) => setData({ ...data, subheadline: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Requirements (Editable)</label>
                <button 
                  onClick={handleAddPoint}
                  className="text-[10px] font-bold text-[#007cd8] hover:text-[#021a5a] transition-colors uppercase tracking-widest cursor-pointer"
                >
                  + Add Point
                </button>
              </div>
              <div className="space-y-3">
                {data.points?.map((point, i) => (
                  <div key={i} className="flex items-center space-x-3 group">
                    <div className="flex-1">
                      <Input 
                        placeholder={`Requirement ${i + 1}`}
                        value={point}
                        className="bg-white hover:shadow-md focus:ring-4 focus:ring-[#007cd8]/5 transition-all"
                        onChange={(e) => handleUpdatePoint(i, e.target.value)}
                      />
                    </div>
                    <button 
                      onClick={() => handleRemovePoint(i)}
                      className="p-2 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="HR Email Address" value={data.email} className="bg-white" onChange={(e) => setData({ ...data, email: e.target.value })} />
              <Input label="Action Button Label" value={data.cta} className="bg-white" onChange={(e) => setData({ ...data, cta: e.target.value })} />
            </div>
          </div>
        </section>

        <button 
          onClick={() => onGenerate(data)}
          disabled={isGenerating}
          className={cn(
            "w-full py-4 bg-[#021a5a] text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-3 hover:bg-[#03247c] transition-all shadow-lg shadow-navy-950/10 disabled:opacity-50 active:scale-[0.98] cursor-pointer",
            isGenerating && "cursor-not-allowed"
          )}
        >
          {isGenerating ? (
             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span className="uppercase tracking-widest">Generate Design</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
