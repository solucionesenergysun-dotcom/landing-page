import React, { useState } from 'react';
import { faqsData } from '../data/faqs';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/storage';

interface FAQSectionProps {
  darkMode: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ darkMode }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOtherQuestion = () => {
    const text = encodeURIComponent('¡Hola Soluciones en Energía Solar! Tengo una pregunta sobre sus servicios de paneles y bombas en Agustín Codazzi: ');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <section id="preguntas" className="py-16 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            RESOLVEMOS TUS DUDAS
          </span>
          <h2 className={`mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Preguntas frecuentes
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Información rápida para que tomes la mejor decisión sin rodeos.
          </p>
        </div>

        {/* Accordions List matching screenshot */}
        <div className="space-y-4">
          {faqsData.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  darkMode 
                    ? 'bg-slate-900/80 border-slate-800' 
                    : 'bg-white border-slate-200/90 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className={`w-full py-5 px-6 text-left flex items-center justify-between gap-4 transition-colors ${
                    isOpen 
                      ? darkMode ? 'text-emerald-400' : 'text-emerald-700' 
                      : darkMode ? 'text-white hover:text-emerald-400' : 'text-slate-900 hover:text-emerald-700'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg pr-2 leading-snug">
                    {item.question}
                  </span>
                  <div className={`p-1 rounded-full transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed border-t ${
                    darkMode 
                      ? 'text-slate-300 border-slate-800/80 bg-slate-900/50' 
                      : 'text-slate-600 border-slate-100 bg-slate-50/50'
                  }`}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Orange Button matching screenshot */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={handleOtherQuestion}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-98 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Tengo otra pregunta</span>
          </button>
        </div>

      </div>
    </section>
  );
};
