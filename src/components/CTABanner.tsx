import React from 'react';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/storage';

interface CTABannerProps {
  onOpenCalculator: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onOpenCalculator }) => {
  const handleTalkToAdvisor = () => {
    const text = encodeURIComponent('¡Hola! Quiero hablar con un asesor técnico de Soluciones en Energía Solar para un proyecto en Agustín Codazzi / Cesar.');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Emerald Rich Banner matching screenshot */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl border border-emerald-700/40">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto space-y-6">
            
            {/* Pill matching screenshot */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/60 backdrop-blur-md text-emerald-200 text-xs sm:text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Independencia y Ahorro Inmediato</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              ¿Listo para ahorrar con energía solar?
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
              Da el paso hacia una energía constante en tu hogar, comercio o bomba sumergible en el campo.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Orange Button matching screenshot */}
              <button
                onClick={handleTalkToAdvisor}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-98 shadow-xl shadow-orange-950/40 transition-all cursor-pointer group"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Hablar con un asesor</span>
                <ArrowRight className="w-4 h-4 opacity-75 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm text-emerald-100 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-600/40 transition-colors"
              >
                <span>Calcular costo de instalación</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
