
import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Zap } from 'lucide-react';
import { Language, BilingualText } from '../types';

interface TimerProps {
  language: Language;
  t: (text: BilingualText) => string;
  initialSeconds?: number;
}

const Timer: React.FC<TimerProps> = ({ language, t, initialSeconds = 30 }) => {
  const [minutes, setMinutes] = useState(Math.floor(initialSeconds / 60));
  const [seconds, setSeconds] = useState(initialSeconds % 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(s => s - 1);
        } else if (minutes > 0) {
          setMinutes(m => m - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (minutes === 0 && seconds === 0 && isRunning) {
      setIsRunning(false);
      const msg = language === 'ar' ? 'انتهى الوقت! استعد للمجموعة التالية' : 'Time is up! Prepare for the next set';
      
      // Visual feedback
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      alert(msg);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, language]);

  const setPreset = (s: number) => {
    setIsRunning(false);
    setMinutes(Math.floor(s / 60));
    setSeconds(s % 60);
  };

  const reset = () => {
    setMinutes(Math.floor(initialSeconds / 60));
    setSeconds(initialSeconds % 60);
    setIsRunning(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="relative group text-center">
        <div className="absolute inset-0 bg-indigo-500/10 blur-[50px] rounded-full scale-75 group-hover:scale-100 transition-transform"></div>
        <div className="relative text-7xl font-mono font-black text-white tracking-tighter drop-shadow-2xl">
          {String(minutes).padStart(2, '0')}<span className="text-indigo-500 animate-pulse">:</span>{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {[30, 60, 90, 120].map(s => (
          <button 
            key={s}
            onClick={() => setPreset(s)}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold text-gray-400 border border-white/5 transition-all"
          >
            {s}s
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xs mx-auto">
        <div className="flex-1 flex flex-col items-center">
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-center text-xl font-mono focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-white"
          />
        </div>
        <div className="flex-1 flex flex-col items-center">
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-center text-xl font-mono focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-white"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 flex items-center justify-center py-5 rounded-[24px] font-black transition-all active:scale-95 shadow-2xl ${
            isRunning 
              ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/30' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-900/30'
          }`}
        >
          {isRunning ? <Pause className="mr-2 h-6 w-6" /> : <Play className="mr-2 h-6 w-6" />}
          {isRunning ? t({ en: 'PAUSE', ar: 'إيقاف' }) : t({ en: 'START', ar: 'ابدأ' })}
        </button>
        <button
          onClick={reset}
          className="p-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-[24px] transition-all border border-white/10 active:scale-90"
        >
          <RefreshCw className="h-6 w-6" />
        </button>
      </div>
      
      <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10 flex items-center space-x-3 rtl:space-x-reverse">
        <Zap className="h-4 w-4 text-indigo-400" />
        <p className="text-[10px] text-indigo-200/60 leading-tight font-medium">
          {t({ 
            en: 'Recommended rest: 30-60s for hypertrophy, 2-3m for strength.',
            ar: 'الراحة الموصى بها: 30-60 ثانية للتضخيم، 2-3 دقائق للقوة.'
          })}
        </p>
      </div>
    </div>
  );
};

export default Timer;
