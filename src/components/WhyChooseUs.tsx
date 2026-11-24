import React from 'react';
import { SlidersHorizontal, Home, Infinity as InfinityIcon, MessageCircle } from 'lucide-react';

interface WhyChooseUsProps {
  darkMode: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ darkMode }) => {
  const reasons = [
    {
      title: 'Nos adaptamos a tu necesidad',
      description: 'Analizamos tu requerimiento puntual de energía o bombeo para no sobredimensionar ni quedarte corto.',
      icon: SlidersHorizontal,
    },
    {
      title: 'Instalación en casa y en el campo',
      description: 'Experiencia en tejados residenciales y montaje en pozos profundos de fincas ganaderas.',
      icon: Home,
    },
    {
      title: 'Todo en un solo lugar',
      description: 'Venta de equipos, repuestos eléctricos e instalación profesional directa sin intermediarios.',
      icon: InfinityIcon,
    },
    {
      title: 'Atención directa por WhatsApp',
      description: 'Sin formularios engorrosos: contacto inmediato con nuestro equipo técnico local.',
      icon: MessageCircle,
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            CONFIANZA REGIONAL
          </span>
          <h2 className={`mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Por qué elegirnos
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Conocemos el clima del Cesar y entregamos respuestas técnicas claras y duraderas.
          </p>
        </div>

        {/* 4 Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all duration-200 ${
                  darkMode 
                    ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80' 
                    : 'bg-white border-slate-200/90 hover:border-emerald-500/50 hover:shadow-lg'
                } flex flex-col justify-between`}
              >
                <div>
                  {/* Clean rounded icon box matching screenshot */}
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className={`font-bold text-lg mb-2 leading-snug ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-sm leading-relaxed ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
