import { useState, useEffect } from 'react';
import { Deal, FilterState, SortKey } from '../types';
import { fetchDeals } from '../lib/dealsApi';
import { analytics } from '../lib/analytics';
import { applyFilters } from '../lib/dealFilters';

interface UseDealsReturn {
  deals: Deal[];
  isLoading: boolean;
  error: string | null;
  filters: FilterState;
  setSort: (key: SortKey) => void;
  setMinScore: (score: number) => void;
}

const DEFAULT_FILTERS: FilterState = {
  sortKey: 'score_desc',
  minScore: 0,
  category: null,
};

export function useDeals(): UseDealsReturn {
  const [rawDeals, setRawDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  useEffect(() => {
    let cancelled = false;

    fetchDeals()
      .then((data) => {
        if (!cancelled) setRawDeals(data);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load deals. Please try again.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setSort = (key: SortKey) => {
    analytics.sortChanged(key);
    setFilters((prev) => ({ ...prev, sortKey: key }));
  };

  const setMinScore = (score: number) => {
    analytics.filterChanged(score);
    setFilters((prev) => ({ ...prev, minScore: score }));
  };

  return {
    deals: applyFilters(rawDeals, filters),
    isLoading,
    error,
    filters,
    setSort,
    setMinScore,
  };
}