import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Deal } from '../types';

interface Props {
  deal: Deal;
  onPress: (deal: Deal) => void;
}

function conditionLabel(condition: Deal['condition']): string {
  switch (condition) {
    case 'like_new': return 'Like New';
    case 'very_good': return 'Very Good';
    case 'good': return 'Good';
  }
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90 ? '#22c55e' :
    score >= 75 ? '#f59e0b' :
    '#ef4444';

  return (
    <View style={[styles.scoreBadge, { backgroundColor: color + '20', borderColor: color }]}>
      <Text style={[styles.scoreText, { color }]}>{score}</Text>
      <Text style={[styles.scoreLabel, { color }]}>score</Text>
    </View>
  );
}

function DealCard({ deal, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(deal)}
      android_ripple={{ color: '#e2e8f020' }}
    >
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.brand}>{deal.brand}</Text>
          <Text style={styles.title} numberOfLines={2}>{deal.title}</Text>
        </View>
        <ScoreBadge score={deal.refurbedScore} />
      </View>

      <View style={styles.footer}>
        <View style={styles.priceBlock}>
          <Text style={styles.price}>€{deal.price}</Text>
          <Text style={styles.originalPrice}>€{deal.originalPrice}</Text>
        </View>
        <View style={styles.discountPill}>
          <Text style={styles.discountText}>-{deal.discountPercent}%</Text>
        </View>
      </View>

      <View style={styles.meta}>
        <Text style={styles.condition}>{conditionLabel(deal.condition)}</Text>
        {!deal.inStock && <Text style={styles.outOfStock}>Out of stock</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  titleBlock: { flex: 1 },
  brand: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
    lineHeight: 22,
  },
  scoreBadge: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 50,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 20,
  },
  scoreLabel: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f1f5f9',
  },
  originalPrice: {
    fontSize: 14,
    color: '#64748b',
    textDecorationLine: 'line-through',
  },
  discountPill: {
    backgroundColor: '#22c55e20',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  discountText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#22c55e',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  condition: { fontSize: 12, color: '#64748b' },
  outOfStock: { fontSize: 12, color: '#ef4444' },
});

export default memo(DealCard);