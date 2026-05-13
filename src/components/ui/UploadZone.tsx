'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  label: string;
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  className?: string;
  icon?: 'upload' | 'image';
  value?: string | string[];
}

export function UploadZone({ label, onUpload, multiple = false, className, icon = 'upload', value }: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
  const preview = Array.isArray(value) ? value[0] : value;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    multiple,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 group relative overflow-hidden',
        isDragActive && 'border-primary bg-primary/10',
        hasValue && 'border-emerald-500/30 bg-emerald-500/5',
        className
      )}
    >
      <input {...getInputProps()} />
      
      {hasValue && preview ? (
        <div className="absolute inset-0 z-0">
          <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-navy-950/40" />
        </div>
      ) : null}

      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10",
        hasValue ? "bg-emerald-500/20" : "bg-white/5 group-hover:bg-primary/10"
      )}>
        {hasValue ? (
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">✓</span>
          </div>
        ) : icon === 'upload' ? (
          <Upload className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
        ) : (
          <ImageIcon className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
        )}
      </div>
      <span className={cn(
        "text-xs font-medium text-center leading-tight z-10",
        hasValue ? "text-emerald-400" : "text-foreground/60"
      )}>
        {label}
      </span>
    </div>
  );
}
