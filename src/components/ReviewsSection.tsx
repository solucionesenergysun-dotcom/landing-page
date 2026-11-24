import React, { useState } from 'react';
import { CustomerReview } from '../types';
import { Star, User, PlusCircle, CheckCircle, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewsSectionProps {
  darkMode: boolean;
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  darkMode,
  reviews,
  onAddReview,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [projectType, setProjectType] = useState('Bomba Sumergible Solar');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddReview({
      name: name.trim(),
      city: city.trim() || 'Agustín Codazzi, Cesar',
      rating,
      comment: comment.trim(),
      projectType,
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setName('');
    setCity('');
    setComment('');
    setModalOpen(false);
  };

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            EXPERIENCIAS
          </span>
          <h2 className={`mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Lo que dicen nuestros clientes
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Espacios de referencia de quienes ya confían en nuestro trabajo.
          </p>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-500/30 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Dejar mi opinión</span>
            </button>
          </div>
        </div>

        {/* 3 Testimonials Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className={`p-7 rounded-3xl border transition-all duration-200 ${
                darkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50' 
                  : 'bg-white border-slate-200/90 hover:border-emerald-500/50 hover:shadow-lg'
              } flex flex-col justify-between`}
            >
              <div>
                {/* Header with pill and stars matching screenshot */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.verified ? 'Verificado' : 'Ejemplo'}
                  </span>

                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className={`text-sm italic leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  "{item.comment}"
                </p>
              </div>

              {/* Author footer matching screenshot: circular user avatar + Name • City */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <h4 className={`font-bold text-sm truncate ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {item.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold tracking-tight mb-2">
              Comparte tu experiencia
            </h3>
            <p className={`text-xs sm:text-sm mb-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Tu opinión ayuda a otros ganaderos y familias del Cesar a elegir energía solar confiable.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Tu nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: José Mendoza"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Ubicación (Finca / Municipio)
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ej: Agustín Codazzi · Vereda San Ramón"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Tipo de proyecto
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Bomba Sumergible Solar">Bomba Sumergible Solar</option>
                  <option value="Paneles Solares Residencial">Paneles Solares Residencial</option>
                  <option value="Sistema Aislado con Baterías">Sistema Aislado con Baterías</option>
                  <option value="Cerca Eléctrica Solar">Cerca Eléctrica Solar</option>
                  <option value="Suministros del Almacén">Suministros del Almacén</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Calificación
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-amber-500 ml-2">
                    {rating} de 5 estrellas
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Tu opinión sobre el servicio
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos cómo ha sido el funcionamiento de los equipos o la atención en el almacén..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm resize-none ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all"
                >
                  Publicar reseña
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-3 px-4 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
