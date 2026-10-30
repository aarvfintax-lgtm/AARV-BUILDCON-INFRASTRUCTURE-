export type Language = 'hi' | 'en';

export interface MaterialItem {
  id: number;
  nameHi: string;
  nameEn: string;
  category: 'gitti' | 'dust_sand' | 'base_metal';
  rate: number; // in INR per Metric Ton (MT)
  unit: string;
  sizeSpecs: string;
  iconName: string;
  descriptionHi: string;
  descriptionEn: string;
  recommendedHi: string;
  recommendedEn: string;
  hsnCode: string; // HSN Code (2517 / 2505)
  gstRate: number; // 5% standard under GST Act
}

export interface DispatchPost {
  id: string;
  title: string;
  tag: string;
  time: string;
  imgUrl: string;
  materialName?: string;
  tons?: number;
  destination?: string;
  truckType?: string;
}

export interface QuoteCalculation {
  material: MaterialItem;
  tons: number;
  truckType: string;
  distanceKm: number;
  materialCost: number;
  freightCost: number;
  subtotal: number;
  gstRate: number; // 5%
  gstType: 'intra' | 'inter'; // Intra (CGST+SGST) or Inter (IGST)
  gstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  grandTotal: number;
  customerName: string;
  customerPhone: string;
  customerGstin?: string;
  timestamp: string;
  quoteId: string;
}

export interface MachineryItem {
  id: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  specsHi: string;
  specsEn: string;
  icon: string;
  availableFor: string;
}

export type ThemeMode = 'light' | 'dark';

export interface ReviewFeedbackItem {
  id: string;
  author: string;
  company: string;
  location: string;
  rating: number; // 1 to 5
  category: 'material' | 'service' | 'both';
  targetItem: string; // e.g. "20mm रोड़ी / Coarse Aggregate", "ऑन-टाइम ट्रांसपोर्ट डिलीवरी", "धर्मकांटा वेईमेंट व ई-रवाना"
  comment: string;
  date: string;
  verified: boolean;
}
