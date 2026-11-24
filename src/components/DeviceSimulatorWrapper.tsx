import React from 'react';
import { DeviceViewMode } from '../types';
import { Wifi, BatteryMedium, Signal, Sparkles, Smartphone, Monitor } from 'lucide-react';

interface DeviceSimulatorWrapperProps {
  deviceMode: DeviceViewMode;
  onSetDeviceMode: (mode: DeviceViewMode) => void;
  children: React.ReactNode;
  darkMode: boolean;
}

export const DeviceSimulatorWrapper: React.FC<DeviceSimulatorWrapperProps> = ({
  deviceMode,
  onSetDeviceMode,
  children,
  darkMode,
}) => {
  // If 'web', render direct full-width children
  if (deviceMode === 'web') {
    return (
      <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F8FAF9] text-slate-800'}`}>
        {children}
      </div>
    );
  }

  const isIOS = deviceMode === 'ios';

  return (
    <div className={`min-h-screen py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center justify-start transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-200/80 text-slate-800'
    }`}>
      
      {/* Simulator Device Switcher Banner */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-800 shadow-md text-xs font-semibold">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1">
            {isIOS ? '📱 Vista iPhone iOS' : '🤖 Vista Android Pixel'}
          </span>
          <button
            onClick={() => onSetDeviceMode('web')}
            className="ml-2 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white transition-colors text-slate-600 dark:text-slate-300 flex items-center gap-1"
          >
            <Monitor className="w-3 h-3" />
            <span>Pantalla Completa</span>
          </button>
        </div>
      </div>

      {/* Mobile Device Frame */}
      <div className={`relative w-full max-w-[420px] rounded-[52px] p-3 shadow-2xl transition-all duration-300 border-4 ${
        isIOS
          ? 'bg-slate-950 border-slate-800 ring-12 ring-slate-900/60 shadow-slate-950/80'
          : 'bg-zinc-900 border-zinc-700 ring-8 ring-zinc-800/80 shadow-zinc-950/80'
      }`}>
        
        {/* Device Screen Interior */}
        <div className={`relative w-full rounded-[42px] overflow-hidden border border-slate-800 flex flex-col ${
          darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F8FAF9] text-slate-800'
        }`} style={{ height: '880px', maxHeight: 'calc(100vh - 120px)' }}>
          
          {/* Native Status Bar */}
          <div className={`h-11 px-7 flex items-center justify-between text-xs font-semibold z-50 shrink-0 select-none ${
            darkMode ? 'bg-slate-900/80 text-white' : 'bg-white/80 text-slate-900'
          } backdrop-blur-md`}>
            
            {/* Clock */}
            <span className="font-mono text-xs font-bold tracking-tight">9:41</span>

            {/* Dynamic Island / Notch or Punch Hole */}
            {isIOS ? (
              <div className="w-24 h-5 rounded-full bg-black flex items-center justify-center gap-2 px-2 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
              </div>
            ) : (
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-800"></div>
            )}

            {/* Native Signals & Battery */}
            <div className="flex items-center gap-1.5 text-xs">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>

          {/* Device Scrollable Viewport */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative">
            {children}
          </div>

          {/* Native Home Indicator Bar */}
          <div className={`h-6 flex items-center justify-center shrink-0 z-50 select-none ${
            darkMode ? 'bg-slate-950' : 'bg-[#F8FAF9]'
          }`}>
            {isIOS ? (
              <div className="w-32 h-1 rounded-full bg-slate-400 dark:bg-slate-600"></div>
            ) : (
              <div className="w-20 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600"></div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
