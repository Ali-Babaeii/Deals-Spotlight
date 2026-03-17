import { Deal, FilterState, SortKey } from '../types';

export function sortDeals(deals: Deal[], key: SortKey): Deal[] {
  const copy = [...deals];
  switch (key) {
    case 'price_asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'score_desc':
      return copy.sort((a, b) => b.refurbedScore - a.refurbedScore);
    case 'discount_desc':
      return copy.sort((a, b) => b.discountPercent - a.discountPercent);
    default:
      return copy;
  }
}

export function applyFilters(deals: Deal[], filters: FilterState): Deal[] {
  let result = deals.filter((d) => d.refurbedScore >= filters.minScore);
  if (filters.category) {
    result = result.filter((d) => d.category === filters.category);
  }
  return sortDeals(result, filters.sortKey);
}