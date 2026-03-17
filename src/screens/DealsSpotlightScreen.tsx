import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ViewToken,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Deal } from '../types';
import { useDeals } from '../hooks/useDeals';
import { analytics } from '../lib/analytics';
import DealCard from '../components/DealCard';
import SkeletonCard from '../components/SkeletonCard';
import SortFilterBar from '../components/SortFilterBar';

type Props = NativeStackScreenProps<RootStackParamList, 'DealsSpotlight'>;

const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 60,
  minimumViewTime: 300,
};

const SKELETONS = Array.from({ length: 4 }, (_, i) => i);

export default function DealsSpotlightScreen({ navigation }: Props) {
  const { deals, isLoading, error, filters, setSort, setMinScore } = useDeals();
  const impressionsSent = useRef(new Set<string>());

  useEffect(() => {
    analytics.dealsScreenViewed();
  }, []);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      viewableItems.forEach((vt, index) => {
        const deal = vt.item as Deal;
        if (!impressionsSent.current.has(deal.id)) {
          impressionsSent.current.add(deal.id);
          analytics.dealImpression(deal.id, index);
        }
      });
    },
    []
  );

  const handleDealPress = useCallback(
    (deal: Deal) => {
      analytics.dealClick(deal.id);
      navigation.navigate('DealDetail', { dealId: deal.id });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Deal }) => <DealCard deal={item} onPress={handleDealPress} />,
    [handleDealPress]
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeletonFilterBar} />
        {SKELETONS.map((i) => <SkeletonCard key={i} />)}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={deals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <SortFilterBar
            filters={filters}
            onSortChange={setSort}
            onMinScoreChange={setMinScore}
          />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No deals match your filters.</Text>
          </View>
        }
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  list: { paddingBottom: 32 },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: { color: '#ef4444', fontSize: 15, textAlign: 'center' },
  emptyText: { color: '#64748b', fontSize: 15, textAlign: 'center' },
  skeletonFilterBar: {
    height: 46,
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
});