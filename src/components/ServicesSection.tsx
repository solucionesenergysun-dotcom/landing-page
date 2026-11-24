import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { servicesData } from '../data/services';
import { ArrowUpRight, Check, X, Shield, Clock, Zap, MessageSquare } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/storage';

interface ServicesSectionProps {
  darkMode: boolean;
  onOpenCalculatorForService: (serviceId: string) => void;
  onOpenSuppliesCatalog: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  darkMode,
  onOpenCalculatorForService,
  onOpenSuppliesCatalog
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleAction = (service: ServiceItem) => {
    if (service.id === 'supplies-store') {
      onOpenSuppliesCatalog();
    } else {
      onOpenCalculatorForService(service.id);
    }
  };

  const openWhatsAppForService = (service: ServiceItem) => {
    const text = encodeURIComponent(`Hola, quisiera cotizar el servicio de: ${service.title} en Agustín Codazzi / Cesar.`);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <section id="servicios" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            CAPACIDADES TÉCNICAS
          </span>
          <h2 className={`mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Nuestros servicios
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Equipamiento duradero y montaje profesional pensado para las exigencias climáticas de nuestra región.
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 ${
                darkMode 
                  ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-600/50 hover:shadow-emerald-950/20' 
                  : 'bg-white border-slate-200/90 hover:border-emerald-500/40 hover:shadow-xl'
              } shadow-md`}
            >
              {/* Card Image with Badge */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badge matching screenshot */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-emerald-700/90 backdrop-blur-md shadow-sm border border-emerald-500/30">
                    {service.badge}
                  </span>
                </div>

                {/* Quick inspect button */}
                <button
                  onClick={() => setSelectedService(service)}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Ver especificaciones técnicas"
                  aria-label={`Ver detalles de ${service.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={`text-xl font-bold mb-2 tracking-tight ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {service.description}
                  </p>

                  {/* Consultar precio link */}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group/link mb-6"
                  >
                    <span>{service.priceNote}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-link:translate-x-0.5 group-link:-translate-y-0.5" />
                  </button>
                </div>

                {/* Orange Action Button matching screenshot */}
                <button
                  onClick={() => handleAction(service)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-98 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>{service.ctaText}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Technical Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-3">
              {selectedService.badge}
            </span>

            <h3 className="text-2xl font-bold tracking-tight mb-2">
              {selectedService.title}
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {selectedService.description}
            </p>

            {/* Gallery if multiple images */}
            {selectedService.gallery && selectedService.gallery.length > 1 && (
              <div className="mb-5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                  Fotografías de Proyectos Reales en Codazzi
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {selectedService.gallery.map((imgUrl, gIdx) => (
                    <div key={gIdx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 group/img">
                      <img
                        src={imgUrl}
                        alt={`${selectedService.title} - Foto ${gIdx + 1}`}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                  Características de Ingeniería
                </h4>
                <ul className="space-y-2">
                  {selectedService.details.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-3.5 rounded-2xl border ${
                darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              } space-y-2 text-xs`}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Garantía:</strong> {selectedService.details.warranty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span><strong>Tiempos:</strong> {selectedService.details.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setSelectedService(null);
                  handleAction(selectedService);
                }}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md transition-all text-center"
              >
                {selectedService.ctaText}
              </button>
              <button
                onClick={() => openWhatsAppForService(selectedService)}
                className="py-3 px-4 rounded-xl font-semibold text-sm border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
