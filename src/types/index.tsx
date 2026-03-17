export type DealCategory = 'phones' | 'laptops' | 'tablets' | 'audio' | 'cameras';

export interface Deal {
  id: string;
  title: string;
  brand: string;
  category: DealCategory;
  price: number;
  originalPrice: number;
  discountPercent: number;
  refurbedScore: number;
  description: string;
  condition: 'like_new' | 'very_good' | 'good';
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export type SortKey = 'price_asc' | 'price_desc' | 'score_desc' | 'discount_desc';

export interface FilterState {
  sortKey: SortKey;
  minScore: number;
  category: DealCategory | null;
}

export type RootStackParamList = {
  DealsSpotlight: undefined;
  DealDetail: { dealId: string };
};