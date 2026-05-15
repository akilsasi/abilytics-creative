'use client';

import React, { useState } from 'react';
import { Input, Button, Slider } from './ui';
import { UploadZone } from './ui/UploadZone';
import { Briefcase, Video, Heart, Rocket, Sparkles, Plus, X, ChevronDown, Edit3, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreativeType, CreativeData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const creativeTypes = [
  { id: 'hiring', label: 'Hiring', icon: Briefcase, color: 'text-[#007cd8]' },
  { id: 'businessCard', label: 'Business Card', icon: CreditCard, color: 'text-[#00D4AA]' },
] as const;

interface GeneratorPanelProps {
  onGenerate: (data: CreativeData) => void;
  isGenerating: boolean;
}

export default function GeneratorPanel({ onGenerate, isGenerating }: GeneratorPanelProps) {
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [isParsing, setIsParsing] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  
  const [data, setData] = useState<CreativeData>({
    websiteUrl: 'https://abilytics.ai',
    brandColors: ['#021a5a', '#00b15c', '#007cd8'],
    creativeType: 'hiring',
    headline: 'Hiring',
    subheadline: '',
    cta: 'SEND RESUME',
    hashtags: '#Abilytics #AI #Hiring',
    style: {
      creativityLevel: 30,
      brandStrictness: 95,
    },
    email: 'syno.k@abilytics.com',
    location: '',
    experience: '',
    points: [],
    name: '',
    designation: '',
    phone: '',
    email: ''
  });

  const runAnalysis = (text: string) => {
    setIsParsing(true);
    setInputText(text);
    
    // Simulate Intelligent AI Extraction
    setTimeout(() => {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      const extractedData: Partial<CreativeData> = {};
      
      // 1. Role Extraction (Aggressive cleaning)
      const rawRole = lines[0] || 'Professional Role';
      extractedData.role = rawRole
        .replace(/\(to target.*\)/gi, '')
        .replace(/role|position|:/gi, '')
        .replace(/[. ]+$/, '')
        .trim();
      
      // 2. Location & Experience (Keyword-based strict search)
      const locLine = lines.find(l => l.toLowerCase().includes('location:'));
      extractedData.location = locLine ? locLine.split(':')[1].trim() : 'Remote / Hybrid';

      const expLine = lines.find(l => l.toLowerCase().includes('experience:'));
      extractedData.experience = expLine ? expLine.split(':')[1].trim() : '2-4 Years';

      // 3. High-End Copywriting
      extractedData.headline = 'Hiring';
      extractedData.subheadline = `We are seeking a high-performance ${extractedData.role} to drive our US-market expansion and deliver agentic AI solutions to enterprise leaders.`;

      // 4. Professional Points
      extractedData.points = [
        "Strategically target and prospect US-market accounts",
        "Orchestrate outbound outreach via calls and LinkedIn",
        "Qualify high-intent leads and manage pipeline growth",
        "Collaborate on GTM strategies for AI-native solutions"
      ];

      setData(prev => ({
        ...prev,
        ...extractedData,
        cta: 'SEND RESUME',
        email: 'syno.k@abilytics.com'
      }));
      
      setIsParsing(false);
    }, 1200);
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
                        if (type.id === 'businessCard') {
                          setData({
                            ...data,
                            creativeType: type.id,
                            name: '',
                            designation: '',
                            phone: '',
                            email: ''
                          });
                        } else {
                          setData({ ...data, creativeType: type.id });
                        }
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

        {/* SECTION 1: SOURCE CONTENT */}
        {data.creativeType !== 'businessCard' && (
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
                onUpload={() => runAnalysis("Uploaded Content Summary")} 
                icon="upload"
                multiple={false}
              />
            ) : (
              <div className="space-y-2">
                <textarea 
                  className="w-full h-32 bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#007cd8] focus:ring-4 focus:ring-[#007cd8]/5 hover:shadow-md transition-all custom-scrollbar resize-none"
                  placeholder="Paste text here to auto-populate fields..."
                  value={inputText}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInputText(val);
                    if (val.length > 20) runAnalysis(val);
                  }}
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
        )}

        {/* SECTION 2: BRAND IDENTITY */}
        {data.creativeType !== 'businessCard' && (
          <section className="space-y-6 pt-4 border-t border-slate-100">
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
        )}

        {/* SECTION 3: EDITABLE CONTENT */}
        <section className="space-y-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#021a5a]" />
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Editable Content</h3>
            </div>
          </div>

          {data.creativeType === 'businessCard' ? (
            <div className="space-y-5">
              <Input 
                label="Full Name" 
                value={data.name || ''}
                className="bg-white hover:shadow-md transition-all"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <Input 
                label="Designation" 
                value={data.designation || ''}
                className="bg-white hover:shadow-md transition-all"
                onChange={(e) => setData({ ...data, designation: e.target.value })}
              />
              <Input 
                label="Phone Number" 
                value={data.phone || ''}
                className="bg-white hover:shadow-md transition-all"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
              <Input 
                label="Email Address" 
                value={data.email || ''}
                className="bg-white hover:shadow-md transition-all"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
          ) : (
            <div className="space-y-5">
              <Input 
                label="Headline" 
                value={data.headline}
                className="bg-white hover:shadow-md transition-all"
                onChange={(e) => setData({ ...data, headline: e.target.value })}
              />

              <Input 
                label="Job Role / Position" 
                value={data.role || ''}
                className="bg-white hover:shadow-md transition-all"
                onChange={(e) => setData({ ...data, role: e.target.value })}
              />

              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description / Subheadline</label>
                <textarea 
                  className="w-full h-24 bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-[#007cd8] focus:ring-4 focus:ring-[#007cd8]/5 hover:shadow-md transition-all custom-scrollbar resize-none"
                  value={data.subheadline}
                  onChange={(e) => setData({ ...data, subheadline: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Points (Requirements)</label>
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
                          placeholder={`Point ${i + 1}`}
                          value={point}
                          className="bg-white hover:shadow-md transition-all"
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
                <Input label="HR Email Address" value={data.email || ''} className="bg-white" onChange={(e) => setData({ ...data, email: e.target.value })} />
                <Input label="CTA Label" value={data.cta || ''} className="bg-white" onChange={(e) => setData({ ...data, cta: e.target.value })} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input label="Experience" value={data.experience || ''} className="bg-white" onChange={(e) => setData({ ...data, experience: e.target.value })} />
                <Input label="Location" value={data.location || ''} className="bg-white" onChange={(e) => setData({ ...data, location: e.target.value })} />
              </div>
            </div>
          )}
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
            <span className="uppercase tracking-widest">Generate Design</span>
          )}
        </button>
      </div>
    </div>
  );
}
