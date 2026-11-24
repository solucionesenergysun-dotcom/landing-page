import React from 'react';
import { SavedQuote } from '../types';
import { X, Trash2, Calendar, MapPin, Zap, Droplets, MessageSquare, Plus, FileText } from 'lucide-react';
import { formatCOP, WHATSAPP_PHONE } from '../utils/storage';

interface SavedQuotesModalProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  quotes: SavedQuote[];
  onDeleteQuote: (id: string) => void;
  onOpenNewQuote: () => void;
}

export const SavedQuotesModal: React.FC<SavedQuotesModalProps> = ({
  darkMode,
  isOpen,
  onClose,
  quotes,
  onDeleteQuote,
  onOpenNewQuote,
}) => {
  if (!isOpen) return null;

  const handleSendWhatsAppQuote = (quote: SavedQuote) => {
    const isSolar = quote.systemType !== 'bomba_sumergible';
    let text = `¡Hola Soluciones en Energía Solar! Deseo retomar mi cotización guardada (${quote.id}):
- Cliente: ${quote.clientName}
- Ubicación: ${quote.clientLocation}
- Fecha: ${quote.createdAt}
- Sistema: ${isSolar ? `Fotovoltaico ${quote.powerKW || ''} kWp (${quote.panelsCount || ''} paneles)` : `Bomba Sumergible ${quote.pumpHP || ''} HP (${quote.panelsCount || ''} paneles)`}
- Presupuesto estimado: ${formatCOP(quote.estimatedCostCOP)}
${quote.notes ? `- Notas: ${quote.notes}` : ''}
¿Podríamos coordinar la visita técnica en Codazzi?`;

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-6 ${
        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Mis Cotizaciones Guardadas
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Almacenadas de forma persistente en tu dispositivo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quotes List */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
          {quotes.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-slate-800 dark:text-slate-200">
                No tienes cotizaciones guardadas aún
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
                Calcula tu sistema solar o de bombeo y guarda tus resultados para revisarlos cuando quieras.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewQuote();
                }}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Crear nueva cotización</span>
              </button>
            </div>
          ) : (
            quotes.map((quote) => {
              const isSolar = quote.systemType !== 'bomba_sumergible';
              return (
                <div
                  key={quote.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl text-white ${
                        isSolar ? 'bg-amber-500' : 'bg-blue-600'
                      }`}>
                        {isSolar ? <Zap className="w-4 h-4" /> : <Droplets className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                          {quote.clientName}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-500" />
                          <span>{quote.clientLocation}</span>
                          <span>•</span>
                          <Calendar className="w-3 h-3" />
                          <span>{quote.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {formatCOP(quote.estimatedCostCOP)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl text-xs mb-3">
                    <div>
                      <span className="text-slate-400 block">Tipo:</span>
                      <span className="font-semibold">{isSolar ? 'Energía Solar' : 'Bomba Sumergible'}</span>
                    </div>
                    {isSolar ? (
                      <div>
                        <span className="text-slate-400 block">Potencia:</span>
                        <span className="font-semibold">{quote.powerKW} kWp ({quote.panelsCount} paneles)</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-slate-400 block">Potencia Bomba:</span>
                        <span className="font-semibold">{quote.pumpHP} HP ({quote.panelsCount} paneles)</span>
                      </div>
                    )}
                    {quote.monthlySavingsCOP ? (
                      <div>
                        <span className="text-slate-400 block">Ahorro Mensual:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                          {formatCOP(quote.monthlySavingsCOP)}/mes
                        </span>
                      </div>
                    ) : quote.dailyWaterM3 ? (
                      <div>
                        <span className="text-slate-400 block">Producción:</span>
                        <span className="font-semibold">{quote.dailyWaterM3} m³/día</span>
                      </div>
                    ) : null}
                    {quote.codazziZone && (
                      <div>
                        <span className="text-slate-400 block">Sector Codazzi:</span>
                        <span className="font-semibold">{quote.codazziZone}</span>
                      </div>
                    )}
                    {quote.paybackYears && (
                      <div>
                        <span className="text-slate-400 block">Retorno Inversión:</span>
                        <span className="font-semibold text-amber-500 font-mono">{quote.paybackYears} años</span>
                      </div>
                    )}
                  </div>

                  {quote.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-3">
                      "{quote.notes}"
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <button
                      onClick={() => onDeleteQuote(quote.id)}
                      className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>

                    <button
                      onClick={() => handleSendWhatsAppQuote(quote)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Cotizar en WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 sm:p-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-500">
            Total cotizaciones: {quotes.length}
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenNewQuote();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva cotización</span>
          </button>
        </div>

      </div>
    </div>
  );
};
