'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import GeneratorPanel from '@/components/GeneratorPanel';
import PreviewPanel from '@/components/PreviewPanel';
import RecentGenerations from '@/components/RecentGenerations';
import { CreativeData } from '@/types';
import { buildPrompt } from '@/lib/prompt-builder';

// Real generation function calling our API route
const generateImage = async (prompt: string): Promise<string> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate image');
  }

  const data = await response.json();
  return data.imageUrl;
};

export default function Dashboard() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<CreativeData | null>(null);

  const handleGenerate = async (data: CreativeData) => {
    setIsGenerating(true);
    setActiveData(data);
    try {
      const prompt = buildPrompt(data);
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (error: any) {
      console.error("Generation failed:", error);
      alert(`Generation failed: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-['Poppins']">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex flex-col p-10 space-y-10 overflow-y-auto bg-[#f8fafc]">
          <div className="flex-1 flex space-x-12 min-h-0">
            {/* LEFT PANEL: INPUTS */}
            <GeneratorPanel 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating} 
            />
            
            {/* RIGHT PANEL: PREVIEW */}
            <PreviewPanel 
              imageUrl={generatedImage} 
              isGenerating={isGenerating} 
              data={activeData}
            />
          </div>

          <div className="border-t border-slate-200 pt-10">
            <RecentGenerations />
          </div>
        </main>
      </div>
    </div>
  );
}
