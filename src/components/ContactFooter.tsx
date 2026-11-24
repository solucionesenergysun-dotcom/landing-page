import React from 'react';
import { MapPin, Clock, Share2, Phone, MessageSquare, ShieldCheck, Sun } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../utils/storage';

interface ContactFooterProps {
  darkMode: boolean;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ darkMode }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('¡Hola Soluciones Solar! Deseo información y cotización de proyectos o suministros en Agustín Codazzi, Cesar.');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <footer className="pt-8 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Cards Strip matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Card 1: Soluciones Solar */}
          <div className={`p-6 rounded-2xl border ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
          } shadow-xs flex flex-col justify-between`}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Soluciones Solar
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Especialistas en bombeo solar y sistemas fotovoltaicos para el Cesar y la región.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Agustín Codazzi, Cesar</span>
            </div>
          </div>

          {/* Card 2: Horario de Servicio */}
          <div className={`p-6 rounded-2xl border ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
          } shadow-xs flex flex-col justify-between`}>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                Horario de Servicio
              </h4>
              <p className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                [Horario de atención]
              </p>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Lunes a Sábado: Consultas continuas vía WhatsApp y atención en almacén.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mt-4">
              <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>7:00 AM - 6:00 PM</span>
            </div>
          </div>

          {/* Card 3: Canales Digitales */}
          <div className={`p-6 rounded-2xl border ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
          } shadow-xs flex flex-col justify-between`}>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                Canales Digitales
              </h4>
              <p className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                [Redes sociales]
              </p>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Síguenos para conocer proyectos en fincas y novedades del almacén.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-4">
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span>@solucionesenergysun</span>
            </div>
          </div>

          {/* Card 4: Contacto Directo */}
          <div className={`p-6 rounded-2xl border ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
          } shadow-xs flex flex-col justify-between`}>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                Contacto Directo
              </h4>
              <p className={`text-xs leading-relaxed mb-2 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Línea oficial de soporte y cotizaciones:
              </p>
              <a
                href={`tel:${WHATSAPP_PHONE}`}
                className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-600 transition-colors mb-2"
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>{WHATSAPP_DISPLAY}</span>
              </a>
            </div>
            <button
              onClick={openWhatsApp}
              className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Escribir al WhatsApp {WHATSAPP_DISPLAY}</span>
            </button>
          </div>

        </div>

        {/* Detailed Footer Section matching screenshot bottom */}
        <div className={`p-8 sm:p-10 rounded-3xl border ${
          darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-[#EBF7F0]/70 border-emerald-100'
        } grid grid-cols-1 md:grid-cols-3 gap-8 mb-8`}>
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Sun className="w-4 h-4 text-amber-300" />
              </div>
              <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Soluciones Solar
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Ingeniería fotovoltaica confiable, bombeo solar de agua y respaldo energético para el campo y el comercio en Agustín Codazzi y la región Caribe.
            </p>
          </div>

          {/* Location & Coverage */}
          <div className="space-y-2">
            <h5 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Ubicación & Cobertura
            </h5>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Agustín Codazzi, Cesar, Colombia
            </p>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Atención técnica especializada en fincas, pozos y proyectos residenciales.
            </p>
          </div>

          {/* Direct contact */}
          <div className="space-y-2">
            <h5 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Contacto Directo
            </h5>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Soporte local vía WhatsApp y asesoría en sitio.
            </p>
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Atención WhatsApp Inmediata</span>
            </button>
          </div>

        </div>

        {/* Copyright notice matching screenshot */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400 py-4">
          <p>© 2025 Soluciones en Energía Solar • Agustín Codazzi, Cesar. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
};
