import { useState, useEffect } from 'react';
import { Deal } from '../types';
import { fetchDealById } from '../lib/dealsApi';

interface UseDealDetailReturn {
  deal: Deal | null;
  isLoading: boolean;
  error: string | null;
}

export function useDealDetail(id: string): UseDealDetailReturn {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchDealById(id)
      .then((data) => {
        if (!cancelled) setDeal(data);
        if (!cancelled && !data) setError('Deal not found.');
      })
      .catch(() => {
        if (!cancelled) setError('Could not load deal details.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { deal, isLoading, error };
}