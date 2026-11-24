import React from 'react';
import { 
  MessageSquare, 
  Truck, 
  Sliders, 
  Store, 
  Sun, 
  Zap, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/storage';

interface HeroProps {
  darkMode: boolean;
  onOpenCalculator: (initialType?: string) => void;
  onNavigateToServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  darkMode,
  onOpenCalculator,
  onNavigateToServices
}) => {
  const openWhatsAppHero = () => {
    const text = encodeURIComponent('¡Hola! Me gustaría cotizar un proyecto de energía solar / bomba sumergible en Agustín Codazzi o zona rural del Cesar.');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <section id="inicio" className="relative pt-8 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Kicker & Headlines */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          
          {/* Top Kicker matching screenshot */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium shadow-xs">
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Energía Sostenible en Agustín Codazzi, Cesar</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Energía solar y agua para tu casa, tu finca o tu negocio
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Instalación de paneles solares y bombas sumergibles en zona urbana y rural, adaptada a lo que tú necesitas.
          </p>

          {/* Primary CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenCalculator('solar-panels')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 active:scale-98 transition-all cursor-pointer group"
            >
              <MessageSquare className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
              <span>Quiero cotizar mi instalación</span>
              <ArrowRight className="w-4 h-4 opacity-75 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenCalculator('energy-savings')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-500/30 shadow-sm transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Estimar ahorro de mi factura</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Container matching screenshot */}
        <div className="mt-10 sm:mt-12 relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-800 bg-slate-900 group">
            
            {/* High-fidelity generated hero photo */}
            <img
              src="/assets/images/hero_solar_house_1791987901454.jpg"
              alt="Casa de campo con paneles solares en Agustín Codazzi Cesar"
              className="w-full h-[320px] sm:h-[460px] md:h-[520px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Gradient Scrim for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

            {/* Floating Badge Bottom-Left matching screenshot */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-[280px] sm:max-w-xs bg-slate-950/85 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/15 text-white shadow-xl">
              <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
                PROYECTOS LLAVE EN MANO
              </span>
              <p className="text-sm sm:text-base font-bold text-white leading-snug mt-0.5">
                Generación Limpia & Confiable
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Garantía de potencia y servicio local</span>
              </div>
            </div>

            {/* Floating Badge Bottom-Right matching screenshot */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end gap-2">
              <button
                onClick={openWhatsAppHero}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 shadow-xl shadow-emerald-950/40 transition-all cursor-pointer group/btn"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>Cotizar por WhatsApp</span>
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-white text-xs font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Cero Cortes de Luz</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Value Cards Strip matching screenshot */}
        <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Zona urbana y rural */}
          <div className={`p-5 rounded-2xl border transition-all duration-200 ${
            darkMode 
              ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-600/50' 
              : 'bg-white/90 border-slate-200/80 hover:border-emerald-500/50'
          } shadow-sm hover:shadow-md flex items-start gap-4`}>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-bold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Zona urbana y rural
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Llegamos a fincas, parcelas y zonas céntricas sin complicaciones.
              </p>
            </div>
          </div>

          {/* Card 2: Soluciones a tu medida */}
          <div className={`p-5 rounded-2xl border transition-all duration-200 ${
            darkMode 
              ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-600/50' 
              : 'bg-white/90 border-slate-200/80 hover:border-emerald-500/50'
          } shadow-sm hover:shadow-md flex items-start gap-4`}>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 shrink-0">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-bold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Soluciones a tu medida
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Dimensionamiento exacto según tu consumo eléctrico o caudal de pozo.
              </p>
            </div>
          </div>

          {/* Card 3: Almacén de suministros */}
          <div className={`p-5 rounded-2xl border transition-all duration-200 ${
            darkMode 
              ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-600/50' 
              : 'bg-white/90 border-slate-200/80 hover:border-emerald-500/50'
          } shadow-sm hover:shadow-md flex items-start gap-4`}>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-bold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Almacén de suministros
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Disponibilidad inmediata de insumos eléctricos en Agustín Codazzi.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
