import React from 'react';
import { MessageSquare, Calculator, CheckCircle2 } from 'lucide-react';

interface StepsSectionProps {
  darkMode: boolean;
  onOpenCalculator: () => void;
}

export const StepsSection: React.FC<StepsSectionProps> = ({ darkMode, onOpenCalculator }) => {
  const steps = [
    {
      step: '01',
      icon: MessageSquare,
      title: 'Escríbenos por WhatsApp',
      description: 'Cuéntanos tu ubicación y qué necesitas para tu finca o casa.',
    },
    {
      step: '02',
      icon: Calculator,
      title: 'Te asesoramos según tu necesidad',
      description: 'Calculamos la potencia o bomba adecuada para ti sin gastos innecesarios.',
    },
    {
      step: '03',
      icon: CheckCircle2,
      title: 'Recibes tu solución',
      description: 'Instalación garantizada o entrega directa de suministros en el almacén o en tu sitio.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            PROCESO FÁCIL Y RÁPIDO
          </span>
          <h2 className={`mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Cómo comprar en 3 pasos
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Del primer mensaje a la solución instalada en tu propiedad.
          </p>
        </div>

        {/* 3 Step Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`relative p-8 rounded-3xl border transition-all duration-200 ${
                  darkMode 
                    ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50' 
                    : 'bg-white border-slate-200/90 hover:border-emerald-500/50 hover:shadow-lg'
                } flex flex-col justify-between`}
              >
                <div>
                  {/* Big Number matching screenshot */}
                  <span className="block text-5xl sm:text-6xl font-black text-emerald-400/90 dark:text-emerald-500/80 font-mono tracking-tighter mb-4">
                    {item.step}
                  </span>

                  {/* Clean rounded icon box */}
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className={`font-bold text-xl mb-3 leading-snug ${
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
