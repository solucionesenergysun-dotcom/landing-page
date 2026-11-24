import React from 'react';
import { 
  Cable, 
  BatteryCharging, 
  Lightbulb, 
  Radio, 
  ShieldCheck, 
  Boxes, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface SuppliesSectionProps {
  darkMode: boolean;
  onOpenSuppliesCatalog: (categoryFilter?: string) => void;
}

export const SuppliesSection: React.FC<SuppliesSectionProps> = ({
  darkMode,
  onOpenSuppliesCatalog
}) => {
  const suppliesCategoriesVisual = [
    {
      id: 'cables',
      title: 'Cables eléctricos, concéntricos y encauchetados',
      description: 'Calibres para alta corriente y uso a la intemperie.',
      icon: Cable,
      tag: 'Certificación RETIE'
    },
    {
      id: 'inversores',
      title: 'Inversores y baterías',
      description: 'Inversores híbridos y baterías de ciclo profundo y litio.',
      icon: BatteryCharging,
      tag: 'Litio LiFePO4 & Gel'
    },
    {
      id: 'iluminacion',
      title: 'Lámparas LED solares',
      description: 'Reflectores y luminarias autónomas para patios y caminos.',
      icon: Lightbulb,
      tag: 'Sensor crepuscular'
    },
    {
      id: 'cercas',
      title: 'Cerca eléctrica',
      description: 'Impulsores solares y accesorios para delimitación ganadera.',
      icon: Radio,
      tag: 'Hasta 150 km'
    },
    {
      id: 'proteccion',
      title: 'Puesta a tierra',
      description: 'Varillas de cobre, conectores y protección contra sobretensiones.',
      icon: ShieldCheck,
      tag: 'DPS & Copperweld'
    },
    {
      id: 'accesorios',
      title: 'Y más suministros eléctricos',
      description: 'Breakers, cajas de paso, terminales y fijaciones solares.',
      icon: Boxes,
      tag: 'Disponibilidad local'
    }
  ];

  return (
    <section id="almacen" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            INVENTARIO DISPONIBLE
          </span>
          <h2 className={`mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Todo para tu instalación eléctrica y solar
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Materiales certificados y de alta durabilidad para técnicos, ganaderos y particulares.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {suppliesCategoriesVisual.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onOpenSuppliesCatalog(item.id)}
                className={`group p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  darkMode 
                    ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800/90' 
                    : 'bg-white border-slate-200/90 hover:border-emerald-500/60 hover:shadow-lg'
                } flex items-start gap-4`}
              >
                {/* Icon box with emerald tint */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className={`font-bold text-base leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-3 ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20">
                      {item.tag}
                    </span>
                    <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver artículos <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Orange Button matching screenshot */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={() => onOpenSuppliesCatalog()}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-98 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Consultar suministros</span>
          </button>
        </div>

      </div>
    </section>
  );
};
