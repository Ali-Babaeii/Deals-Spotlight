# Deals Spotlight

A React Native / Expo feature implementing the "Deals Spotlight" screen.

## How to Run
```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS / Android).

To run the tests:
```bash
npm test
```

## Project Structure
```
src/
  types/        – shared TypeScript interfaces and navigation param types
  data/         – static mock data
  lib/          – analytics wrapper, feature flags, filter logic
  hooks/        – data and state logic, decoupled from UI
  components/   – presentational components

```

## Architectural Decisions

### Hooks own all logic
Components and screens never fetch data or call integrations directly.
All logic lives in `useDeals` and `useDealDetail`.

### Analytics and feature flags as wrappers
`src/lib/analytics.ts` is a typed wrapper around any analytics SDK.
Components call `analytics.dealClick(id)`

### Pure filter functions
`src/lib/dealFilters.ts` contains `sortDeals` and `applyFilters` as pure
functions with no side effects. This makes them trivial to unit test without
rendering any components or mocking React hooks.

### Performance
- `FlatList` for the deals list — only renders visible rows
- `DealCard` wrapped in `React.memo` — won't re-render when siblings change
- `renderItem` and `onPress` handlers are stable via `useCallback`

### State management
Plain `useState` and `useEffect` inside custom hooks. React Query was not
added because the data is fetched once per screen mount and there is no
shared cross screen state.

### TypeScript
All deal shapes, navigation params, filter state, and analytics events are
fully typed. Analytics events use a discriminated union so TypeScript catches
wrong event names or missing fields at the call site.

## What I Would Do Next

- Connect a real backend by replacing the mock data in `src/data/deals.ts`
  with actual API calls
- Add React Query for caching, background refresh, and loading states
- Persist the last used sort preference with AsyncStorage
- Add a collapsing header animation on the list screen as the user scrolls

## OTA Rollout vs Store Release

The initial release ships with `showDealsSpotlight: false`, so the screen
is in the bundle but hidden from users. Once live, the flag can be enabled
remotely via Firebase Remote Config. starting with internal testers, then
a 5% rollout, then 100% with no App Store or Play Store submission needed.
If something goes wrong, flipping the flag back to false is an instant rollback.
