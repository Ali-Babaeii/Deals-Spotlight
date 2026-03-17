import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useDealDetail } from '../hooks/useDealDetail';

type Props = NativeStackScreenProps<RootStackParamList, 'DealDetail'>;

const CONDITION_LABELS: Record<string, string> = {
  like_new: 'Like New',
  very_good: 'Very Good',
  good: 'Good',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text key={star} style={[styles.star, star <= Math.round(rating) && styles.starFilled]}>
          ★
        </Text>
      ))}
      <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
    </View>
  );
}

export default function DealDetailScreen({ route, navigation }: Props) {
  const { dealId } = route.params;
  const { deal, isLoading, error } = useDealDetail(dealId);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  if (error || !deal) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Deal not found.'}</Text>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const saving = deal.originalPrice - deal.price;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{deal.category}</Text>
        </View>
        <View style={styles.scoreLarge}>
          <Text style={styles.scoreLargeValue}>{deal.refurbedScore}</Text>
          <Text style={styles.scoreLargeLabel}>refurbed score</Text>
        </View>
      </View>

      <Text style={styles.brand}>{deal.brand}</Text>
      <Text style={styles.title}>{deal.title}</Text>

      <View style={styles.ratingRow}>
        <StarRating rating={deal.rating} />
        <Text style={styles.reviewCount}>{deal.reviewCount} reviews</Text>
      </View>

      <View style={styles.pricingCard}>
        <View style={styles.pricingRow}>
          <Text style={styles.priceLabel}>Your price</Text>
          <Text style={styles.price}>€{deal.price}</Text>
        </View>
        <View style={styles.pricingRow}>
          <Text style={styles.originalPriceLabel}>Original price</Text>
          <Text style={styles.originalPrice}>€{deal.originalPrice}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.pricingRow}>
          <Text style={styles.savingLabel}>You save</Text>
          <Text style={styles.saving}>€{saving} ({deal.discountPercent}%)</Text>
        </View>
      </View>

      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{CONDITION_LABELS[deal.condition]}</Text>
        </View>
        <View style={[styles.tag, !deal.inStock && styles.tagDanger]}>
          <Text style={[styles.tagText, !deal.inStock && styles.tagTextDanger]}>
            {deal.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>About this item</Text>
      <Text style={styles.description}>{deal.description}</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 20, paddingBottom: 48 },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0f172a',
  },
  errorText: { color: '#ef4444', fontSize: 15, marginBottom: 16 },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#1e293b',
  },
  backButtonText: { color: '#38bdf8', fontWeight: '600' },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryPill: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#334155',
  },
  categoryText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  scoreLarge: {
    alignItems: 'center',
    backgroundColor: '#22c55e20',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  scoreLargeValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#22c55e',
    lineHeight: 28,
  },
  scoreLargeLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#22c55e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  brand: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f1f5f9',
    lineHeight: 28,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  star: { fontSize: 16, color: '#334155' },
  starFilled: { color: '#f59e0b' },
  ratingValue: { fontSize: 14, fontWeight: '600', color: '#94a3b8', marginLeft: 4 },
  reviewCount: { fontSize: 13, color: '#64748b' },
  pricingCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  priceLabel: { color: '#94a3b8', fontSize: 15 },
  price: { color: '#f1f5f9', fontSize: 22, fontWeight: '800' },
  originalPriceLabel: { color: '#64748b', fontSize: 14 },
  originalPrice: { color: '#64748b', fontSize: 14, textDecorationLine: 'line-through' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 8 },
  savingLabel: { color: '#22c55e', fontSize: 14, fontWeight: '600' },
  saving: { color: '#22c55e', fontSize: 14, fontWeight: '700' },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  tag: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tagDanger: { borderColor: '#ef4444', backgroundColor: '#ef444420' },
  tagText: { color: '#94a3b8', fontSize: 13, fontWeight: '500' },
  tagTextDanger: { color: '#ef4444' },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  description: { fontSize: 15, color: '#cbd5e1', lineHeight: 22, marginBottom: 24 },
  sellerName: { fontSize: 15, color: '#f1f5f9', fontWeight: '600', marginBottom: 32 },
  cta: {
    backgroundColor: '#38bdf8',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaDisabled: { backgroundColor: '#334155' },
  ctaText: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
});