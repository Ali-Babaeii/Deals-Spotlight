import { Deal } from '../types';
import { MOCK_DEALS } from '../data/deals';

const SIMULATED_DELAY_MS = 500;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY_MS));
}

export async function fetchDeals(): Promise<Deal[]> {
  return delay([...MOCK_DEALS]);
}

export async function fetchDealById(id: string): Promise<Deal | null> {
  const deal = MOCK_DEALS.find((d) => d.id === id) ?? null;
  return delay(deal);
}