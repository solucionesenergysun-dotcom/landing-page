import React, { useState, useMemo } from 'react';
import { SupplyItem, CartItem } from '../types';
import { suppliesData, suppliesCategories } from '../data/supplies';
import { X, Search, Plus, Minus, ShoppingBag, MessageSquare, Check, Sparkles } from 'lucide-react';
import { formatCOP, WHATSAPP_PHONE } from '../utils/storage';

interface SuppliesCatalogModalProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  cart: CartItem[];
  onUpdateCart: (cart: CartItem[]) => void;
}

export const SuppliesCatalogModal: React.FC<SuppliesCatalogModalProps> = ({
  darkMode,
  isOpen,
  onClose,
  initialCategory = 'all',
  cart,
  onUpdateCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewCartMode, setViewCartMode] = useState(false);

  const filteredItems = useMemo(() => {
    return suppliesData.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.specifications.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const getItemQuantity = (itemId: string) => {
    const found = cart.find(c => c.supply.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleAddToCart = (item: SupplyItem) => {
    const existingIndex = cart.findIndex(c => c.supply.id === item.id);
    if (existingIndex >= 0) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      onUpdateCart(updated);
    } else {
      onUpdateCart([...cart, { supply: item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    const existingIndex = cart.findIndex(c => c.supply.id === itemId);
    if (existingIndex >= 0) {
      const updated = [...cart];
      if (updated[existingIndex].quantity > 1) {
        updated[existingIndex].quantity -= 1;
      } else {
        updated.splice(existingIndex, 1);
      }
      onUpdateCart(updated);
    }
  };

  const totalCartCOP = cart.reduce((acc, curr) => acc + (curr.supply.priceCOP * curr.quantity), 0);
  const totalItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSendCartWhatsApp = () => {
    if (cart.length === 0) return;
    let listText = cart.map(c => `• ${c.quantity}x ${c.supply.name} (${formatCOP(c.supply.priceCOP * c.quantity)})`).join('\n');
    const text = `¡Hola Soluciones en Energía Solar! Deseo cotizar/adquirir los siguientes insumos en el almacén de Agustín Codazzi:
${listText}

Total estimado: ${formatCOP(totalCartCOP)}
¿Tienen disponibilidad inmediata para entrega o retiro?`;

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-6 flex flex-col max-h-[85vh] ${
        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Almacén y Suministros Eléctricos
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Agustín Codazzi, Cesar • Precios con disponibilidad inmediata
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cart trigger button */}
            <button
              onClick={() => setViewCartMode(!viewCartMode)}
              className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                viewCartMode
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cotización ({totalItemsCount})</span>
              {totalItemsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              aria-label="Cerrar almacén"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Categories Bar */}
        {!viewCartMode && (
          <div className="p-4 sm:p-6 pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, calibre de cable, inversor, potencia..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {suppliesCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white'
                      : darkMode
                        ? 'bg-slate-800 text-slate-300 hover:text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {viewCartMode ? (
            /* Cart review mode */
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-2">Resumen de tu cotización de materiales</h4>
              {cart.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <p className="text-sm text-slate-500">Tu lista de materiales está vacía.</p>
                  <button
                    onClick={() => setViewCartMode(false)}
                    className="text-xs font-bold text-emerald-600 hover:underline"
                  >
                    Ver catálogo y agregar artículos
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((cartItem) => (
                    <div
                      key={cartItem.supply.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                        darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex-1">
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                          {cartItem.supply.name}
                        </h5>
                        <p className="text-xs text-slate-500">
                          {formatCOP(cartItem.supply.priceCOP)} por {cartItem.supply.unit}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                          <button
                            onClick={() => handleRemoveFromCart(cartItem.supply.id)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => handleAddToCart(cartItem.supply)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono w-28 text-right">
                          {formatCOP(cartItem.supply.priceCOP * cartItem.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Total Materiales:</span>
                      <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                        {formatCOP(totalCartCOP)}
                      </div>
                    </div>
                    <button
                      onClick={handleSendCartWhatsApp}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 shadow-md flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Solicitar por WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Items catalog grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50/70 border-slate-200'
                    } flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                          {item.name}
                        </h4>
                        {item.popular && (
                          <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                            <Sparkles className="w-2.5 h-2.5" />
                            Popular
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800 mb-3">
                        <strong>Especificaciones:</strong> {item.specifications}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block text-[10px]">Precio unitario ({item.unit}):</span>
                        <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                          {formatCOP(item.priceCOP)}
                        </span>
                      </div>

                      {qty > 0 ? (
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center text-emerald-600 dark:text-emerald-400">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-500/30 flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Agregar a cotización</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="text-xs text-slate-500">
            {filteredItems.length} artículos disponibles en almacén de Codazzi
          </span>

          {cart.length > 0 && !viewCartMode && (
            <button
              onClick={() => setViewCartMode(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm"
            >
              <span>Ver lista seleccionada ({totalItemsCount})</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
