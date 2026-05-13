'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  loading?: boolean;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  loading,
  children, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'premium-gradient text-white shadow-lg shadow-primary/20 hover:opacity-90',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    outline: 'border border-border text-foreground hover:bg-white/5',
    ghost: 'text-foreground/60 hover:text-foreground hover:bg-white/5',
    glow: 'premium-gradient text-white animate-glow'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg font-bold uppercase tracking-wider'
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-xs font-semibold text-foreground/40 uppercase tracking-wider ml-1">{label}</label>}
      <input
        className={cn(
          'w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-foreground/20',
          error && 'border-red-500/50 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-[10px] text-red-500 ml-1">{error}</p>}
    </div>
  );
}

interface SliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  lowLabel?: string;
  highLabel?: string;
}

export function Slider({ label, min, max, value, onChange, lowLabel, highLabel }: SliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-foreground/40 uppercase tracking-wider ml-1">{label}</label>
        <span className="text-[10px] font-bold text-primary uppercase">{value > 70 ? highLabel : value < 30 ? lowLabel : 'Balanced'}</span>
      </div>
      <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full premium-gradient shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300" 
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
