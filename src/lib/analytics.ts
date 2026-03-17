type AnalyticsEvent =
  | { name: 'deal_impression'; dealId: string; position: number }
  | { name: 'deal_click'; dealId: string; source: 'list' | 'deeplink' }
  | { name: 'deals_screen_viewed' }
  | { name: 'sort_changed'; sortKey: string }
  | { name: 'filter_changed'; minScore: number };

function log(event: AnalyticsEvent) {
  if (__DEV__) {
    console.log('[analytics]', event.name, event);
  }
}

export const analytics = {
  dealImpression(dealId: string, position: number) {
    log({ name: 'deal_impression', dealId, position });
  },
  dealClick(dealId: string, source: 'list' | 'deeplink' = 'list') {
    log({ name: 'deal_click', dealId, source });
  },
  dealsScreenViewed() {
    log({ name: 'deals_screen_viewed' });
  },
  sortChanged(sortKey: string) {
    log({ name: 'sort_changed', sortKey });
  },
  filterChanged(minScore: number) {
    log({ name: 'filter_changed', minScore });
  },
};