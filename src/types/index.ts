export type DeviceViewMode = 'web' | 'ios' | 'android';

export interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  priceNote: string;
  ctaText: string;
  details: {
    features: string[];
    typicalApplications: string;
    warranty: string;
    estimatedDelivery: string;
  };
}

export interface SupplyItem {
  id: string;
  name: string;
  category: 'cables' | 'inversores' | 'iluminacion' | 'cercas' | 'proteccion' | 'accesorios';
  description: string;
  specifications: string;
  priceCOP: number;
  unit: string;
  inStock: boolean;
  popular?: boolean;
}

export interface SavedQuote {
  id: string;
  createdAt: string;
  clientName: string;
  clientLocation: string;
  systemType: 'solar_on_grid' | 'solar_off_grid' | 'bomba_sumergible';
  powerKW?: number;
  panelsCount?: number;
  pumpHP?: number;
  estimatedCostCOP: number;
  monthlySavingsCOP?: number;
  dailyWaterM3?: number;
  codazziZone?: string;
  monthlySolarKWh?: number;
  paybackYears?: number;
  tenYearSavingsCOP?: number;
  notes?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  projectType: string;
  verified: boolean;
}

export interface CartItem {
  supply: SupplyItem;
  quantity: number;
}
