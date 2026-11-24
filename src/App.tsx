/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { SuppliesSection } from './components/SuppliesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { StepsSection } from './components/StepsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { CTABanner } from './components/CTABanner';
import { ContactFooter } from './components/ContactFooter';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { SavedQuotesModal } from './components/SavedQuotesModal';
import { SuppliesCatalogModal } from './components/SuppliesCatalogModal';
import { DeviceSimulatorWrapper } from './components/DeviceSimulatorWrapper';
import { 
  getSavedQuotes, 
  deleteQuote, 
  getReviews, 
  addReview, 
  getCart, 
  saveCart, 
  getThemePreference, 
  saveThemePreference, 
  getDeviceMode, 
  saveDeviceMode,
  WHATSAPP_PHONE 
} from './utils/storage';
import { SavedQuote, CustomerReview, CartItem, DeviceViewMode } from './types';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => getThemePreference() === 'dark');
  const [deviceMode, setDeviceMode] = useState<DeviceViewMode>(() => getDeviceMode());
  const [activeNav, setActiveNav] = useState('inicio');

  // Persistent States
  const [quotes, setQuotes] = useState<SavedQuote[]>(() => getSavedQuotes());
  const [reviews, setReviews] = useState<CustomerReview[]>(() => getReviews());
  const [cart, setCart] = useState<CartItem[]>(() => getCart());

  // Modal States
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorType, setCalculatorType] = useState('solar-panels');
  const [savedQuotesOpen, setSavedQuotesOpen] = useState(false);
  const [suppliesCatalogOpen, setSuppliesCatalogOpen] = useState(false);
  const [catalogInitialCategory, setCatalogInitialCategory] = useState('all');

  // Handle dark mode changes
  const handleToggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    saveThemePreference(next ? 'dark' : 'light');
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSetDeviceMode = (mode: DeviceViewMode) => {
    setDeviceMode(mode);
    saveDeviceMode(mode);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCalculator = (serviceType = 'solar-panels') => {
    setCalculatorType(serviceType);
    setCalculatorOpen(true);
  };

  const handleOpenSuppliesCatalog = (category = 'all') => {
    setCatalogInitialCategory(category);
    setSuppliesCatalogOpen(true);
  };

  const handleQuoteSaved = () => {
    setQuotes(getSavedQuotes());
    setCalculatorOpen(false);
    setSavedQuotesOpen(true);
  };

  const handleDeleteQuote = (id: string) => {
    const updated = deleteQuote(id);
    setQuotes(updated);
  };

  const handleAddReview = (newRev: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => {
    addReview(newRev);
    setReviews(getReviews());
  };

  const handleUpdateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    saveCart(newCart);
  };

  const openWhatsAppFloating = () => {
    const text = encodeURIComponent('¡Hola Soluciones en Energía Solar! Deseo cotizar paneles o bombas en Agustín Codazzi, Cesar.');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <DeviceSimulatorWrapper
      deviceMode={deviceMode}
      onSetDeviceMode={handleSetDeviceMode}
      darkMode={darkMode}
    >
      <div className={`w-full min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F8FAF9] text-slate-800'
      }`}>
        
        {/* Top Header matching original design */}
        <Header
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          deviceMode={deviceMode}
          onSetDeviceMode={handleSetDeviceMode}
          activeNav={activeNav}
          onNavigate={handleNavigate}
          onOpenCalculator={() => handleOpenCalculator('solar-panels')}
          onOpenSavedQuotes={() => setSavedQuotesOpen(true)}
          savedQuotesCount={quotes.length}
        />

        {/* Main Content Layout */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            darkMode={darkMode}
            onOpenCalculator={(type) => handleOpenCalculator(type || 'solar-panels')}
            onNavigateToServices={() => handleNavigate('servicios')}
          />

          {/* Capacidades Técnicas / Nuestros Servicios */}
          <ServicesSection
            darkMode={darkMode}
            onOpenCalculatorForService={(serviceId) => handleOpenCalculator(serviceId)}
            onOpenSuppliesCatalog={() => handleOpenSuppliesCatalog()}
          />

          {/* Inventario Disponible / Suministros Eléctricos */}
          <SuppliesSection
            darkMode={darkMode}
            onOpenSuppliesCatalog={(category) => handleOpenSuppliesCatalog(category)}
          />

          {/* Confianza Regional / Por Qué Elegirnos */}
          <WhyChooseUs darkMode={darkMode} />

          {/* Proceso Fácil y Rápido / Cómo Comprar en 3 Pasos */}
          <StepsSection
            darkMode={darkMode}
            onOpenCalculator={() => handleOpenCalculator('solar-panels')}
          />

          {/* Experiencias / Lo Que Dicen Nuestros Clientes */}
          <ReviewsSection
            darkMode={darkMode}
            reviews={reviews}
            onAddReview={handleAddReview}
          />

          {/* Resolvemos Tus Dudas / Preguntas Frecuentes */}
          <FAQSection darkMode={darkMode} />

          {/* High-Impact Call to Action Banner */}
          <CTABanner onOpenCalculator={() => handleOpenCalculator('solar-panels')} />
        </main>

        {/* Contact Footer & Business Information */}
        <ContactFooter darkMode={darkMode} />

        {/* Floating WhatsApp Quick Action Button */}
        <button
          onClick={openWhatsAppFloating}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white shadow-2xl shadow-emerald-950/40 hover:shadow-emerald-500/50 transition-all flex items-center justify-center cursor-pointer group"
          title="Escribir por WhatsApp"
          aria-label="Escribir por WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pl-0 group-hover:pl-2">
            WhatsApp Codazzi
          </span>
        </button>

        {/* Interactive Modals */}
        <QuoteCalculatorModal
          darkMode={darkMode}
          isOpen={calculatorOpen}
          onClose={() => setCalculatorOpen(false)}
          initialType={calculatorType}
          onQuoteSaved={handleQuoteSaved}
        />

        <SavedQuotesModal
          darkMode={darkMode}
          isOpen={savedQuotesOpen}
          onClose={() => setSavedQuotesOpen(false)}
          quotes={quotes}
          onDeleteQuote={handleDeleteQuote}
          onOpenNewQuote={() => {
            setSavedQuotesOpen(false);
            setCalculatorOpen(true);
          }}
        />

        <SuppliesCatalogModal
          darkMode={darkMode}
          isOpen={suppliesCatalogOpen}
          onClose={() => setSuppliesCatalogOpen(false)}
          initialCategory={catalogInitialCategory}
          cart={cart}
          onUpdateCart={handleUpdateCart}
        />

      </div>
    </DeviceSimulatorWrapper>
  );
}
