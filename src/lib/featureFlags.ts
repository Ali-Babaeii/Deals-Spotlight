type FlagKey = 'showDealsSpotlight' | 'showScoreFilter' | 'enableDeepLinks';

const FLAGS: Record<FlagKey, boolean> = {
  showDealsSpotlight: true,
  showScoreFilter: true,
  enableDeepLinks: false,
};

export async function getFlag(key: FlagKey): Promise<boolean> {
  return Promise.resolve(FLAGS[key] ?? false);
}

export function getFlagSync(key: FlagKey): boolean {
  return FLAGS[key] ?? false;
}

export function _overrideFlag(key: FlagKey, value: boolean) {
  FLAGS[key] = value;
}