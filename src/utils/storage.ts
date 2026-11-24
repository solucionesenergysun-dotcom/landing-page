import { SavedQuote, CustomerReview, CartItem, DeviceViewMode } from '../types';
import { initialReviews } from '../data/initialReviews';

const STORAGE_KEYS = {
  QUOTES: 'soluciones_solar_quotes_v1',
  REVIEWS: 'soluciones_solar_reviews_v1',
  CART: 'soluciones_solar_cart_v1',
  THEME: 'soluciones_solar_theme_v1',
  DEVICE_MODE: 'soluciones_solar_device_mode_v1',
  INQUIRIES: 'soluciones_solar_inquiries_v1'
};

export const getSavedQuotes = (): SavedQuote[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUOTES);
    if (!raw) {
      // Seed an initial demo quote so user immediately sees saved quotes functionality
      const seedQuotes: SavedQuote[] = [
        {
          id: 'cot-demo-1',
          createdAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString('es-CO'),
          clientName: 'Finca Ganadera El Mirador',
          clientLocation: 'Vereda San Ramón, Codazzi',
          systemType: 'bomba_sumergible',
          pumpHP: 3,
          panelsCount: 8,
          dailyWaterM3: 24,
          estimatedCostCOP: 14500000,
          notes: 'Pozo profundo a 45 metros, 120 cabezas de ganado bovino.'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(seedQuotes));
      return seedQuotes;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading quotes from storage', err);
    return [];
  }
};

export const saveQuote = (quote: Omit<SavedQuote, 'id' | 'createdAt'>): SavedQuote => {
  const current = getSavedQuotes();
  const newQuote: SavedQuote = {
    ...quote,
    id: 'cot-' + Date.now().toString(36),
    createdAt: new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  };
  const updated = [newQuote, ...current];
  localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
  return newQuote;
};

export const deleteQuote = (id: string): SavedQuote[] => {
  const current = getSavedQuotes();
  const filtered = current.filter(q => q.id !== id);
  localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(filtered));
  return filtered;
};

export const getReviews = (): CustomerReview[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(initialReviews));
      return initialReviews;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading reviews from storage', err);
    return initialReviews;
  }
};

export const addReview = (review: Omit<CustomerReview, 'id' | 'date' | 'verified'>): CustomerReview => {
  const current = getReviews();
  const newReview: CustomerReview = {
    ...review,
    id: 'rev-' + Date.now().toString(36),
    date: 'Reciente',
    verified: true,
  };
  const updated = [newReview, ...current];
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
  return newReview;
};

export const getCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (err) {
    console.error('Error saving cart', err);
  }
};

export const getThemePreference = (): 'light' | 'dark' => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === 'dark' || stored === 'light') return stored;
    return 'light'; // Default to light matching the screenshot
  } catch {
    return 'light';
  }
};

export const saveThemePreference = (theme: 'light' | 'dark') => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch {}
};

export const getDeviceMode = (): DeviceViewMode => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DEVICE_MODE) as DeviceViewMode;
    return (stored === 'web' || stored === 'ios' || stored === 'android') ? stored : 'web';
  } catch {
    return 'web';
  }
};

export const saveDeviceMode = (mode: DeviceViewMode) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DEVICE_MODE, mode);
  } catch {}
};

export const formatCOP = (val: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(val);
};

export const WHATSAPP_PHONE = '573014971307';
export const WHATSAPP_DISPLAY = '(57) 301 497 1307';

export const createWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};
