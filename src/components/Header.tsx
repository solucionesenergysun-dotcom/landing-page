import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  MessageSquare, 
  User, 
  Menu, 
  X, 
  FileText, 
  Smartphone, 
  Monitor, 
  TabletSmartphone,
  PhoneCall
} from 'lucide-react';
import { DeviceViewMode } from '../types';
import { WHATSAPP_PHONE } from '../utils/storage';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  deviceMode: DeviceViewMode;
  onSetDeviceMode: (mode: DeviceViewMode) => void;
  activeNav: string;
  onNavigate: (sectionId: string) => void;
  onOpenCalculator: () => void;
  onOpenSavedQuotes: () => void;
  savedQuotesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  deviceMode,
  onSetDeviceMode,
  activeNav,
  onNavigate,
  onOpenCalculator,
  onOpenSavedQuotes,
  savedQuotesCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'almacen', label: 'Almacén' },
    { id: 'preguntas', label: 'Preguntas' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent('¡Hola Soluciones en Energía Solar! Deseo solicitar asesoría sobre instalaciones solares o suministros en Agustín Codazzi.');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Top Device Switcher & Info Bar for Mobile/Desktop Preview */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium text-slate-200">Agustín Codazzi • Cesar</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">Línea directa: +57 301 497 1307</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Device Mode Switcher */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => onSetDeviceMode('web')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  deviceMode === 'web'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Vista Web Completa"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Web</span>
              </button>
              <button
                onClick={() => onSetDeviceMode('ios')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  deviceMode === 'ios'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Simulador iOS (iPhone)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">iOS</span>
              </button>
              <button
                onClick={() => onSetDeviceMode('android')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  deviceMode === 'android'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Simulador Android"
              >
                <TabletSmartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Android</span>
              </button>
            </div>

            {/* Saved Quotes Quick Access */}
            <button
              onClick={onOpenSavedQuotes}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
              title="Cotizaciones guardadas"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Cotizaciones</span>
              {savedQuotesCount > 0 && (
                <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                  {savedQuotesCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Cambiar tema"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-40 transition-colors duration-200 ${
        darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-100'
      } backdrop-blur-md border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo matching the screenshot */}
          <div 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              {/* Sun & Solar rays icon */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Soluciones en Energía Solar
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                Agustín Codazzi • Cesar
              </span>
            </div>
          </div>

          {/* Navigation Links matching screenshot */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-full border border-slate-200/50 dark:border-slate-700/50">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : darkMode 
                        ? 'text-slate-300 hover:text-white hover:bg-slate-700/60' 
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Escríbenos button matching screenshot */}
            <button
              onClick={openWhatsAppDirect}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Escríbenos</span>
            </button>

            {/* Quick Profile / Account button */}
            <button
              onClick={onOpenSavedQuotes}
              className={`p-2.5 rounded-xl border transition-colors ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              title="Mi cuenta y cotizaciones"
              aria-label="Perfil de usuario"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-xl border transition-colors ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-slate-300' 
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-b px-4 py-4 space-y-2 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  activeNav === item.id
                    ? 'bg-emerald-600 text-white'
                    : darkMode
                      ? 'text-slate-200 hover:bg-slate-800'
                      : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={openWhatsAppDirect}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Escríbenos por WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border ${
                  darkMode ? 'border-slate-700 text-emerald-400 bg-slate-800' : 'border-emerald-200 text-emerald-700 bg-emerald-50'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Cotizar Proyecto Ahora</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
