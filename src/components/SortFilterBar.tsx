import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Modal } from 'react-native';
import { FilterState, SortKey } from '../types';

interface Props {
  filters: FilterState;
  onSortChange: (key: SortKey) => void;
  onMinScoreChange: (score: number) => void;
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'score_desc', label: 'Top Rated' },
  { key: 'price_asc', label: 'Price ↑' },
  { key: 'price_desc', label: 'Price ↓' },
  { key: 'discount_desc', label: 'Biggest Discount' },
];

const SCORE_THRESHOLDS = [0, 70, 80, 90];

export default function SortFilterBar({ filters, onSortChange, onMinScoreChange }: Props) {
  const [scoreModalVisible, setScoreModalVisible] = useState(false);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {SORT_OPTIONS.map((opt) => {
          const active = filters.sortKey === opt.key;
          return (
            <Pressable
              key={opt.key}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => onSortChange(opt.key)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}

        <View style={styles.separator} />

        <Pressable
          style={[styles.chip, filters.minScore > 0 && styles.chipActive]}
          onPress={() => setScoreModalVisible(true)}
        >
          <Text style={[styles.chipText, filters.minScore > 0 && styles.chipTextActive]}>
            Score {filters.minScore > 0 ? `≥ ${filters.minScore}` : 'filter'}
          </Text>
        </Pressable>
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={scoreModalVisible}
        onRequestClose={() => setScoreModalVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setScoreModalVisible(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Min refurbed score</Text>
            <View style={styles.scoreOptions}>
              {SCORE_THRESHOLDS.map((score) => {
                const active = filters.minScore === score;
                return (
                  <Pressable
                    key={score}
                    style={[styles.scoreOption, active && styles.scoreOptionActive]}
                    onPress={() => {
                      onMinScoreChange(score);
                      setScoreModalVisible(false);
                    }}
                  >
                    <Text style={[styles.scoreOptionText, active && styles.scoreOptionTextActive]}>
                      {score === 0 ? 'Any' : `≥ ${score}`}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1e293b',
  },
  chipActive: {
    borderColor: '#38bdf8',
    backgroundColor: '#0ea5e920',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94a3b8',
  },
  chipTextActive: { color: '#38bdf8' },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#334155',
    marginHorizontal: 4,
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderColor: '#334155',
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  scoreOptions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  scoreOption: {
    flex: 1,
    minWidth: 70,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  scoreOptionActive: {
    borderColor: '#38bdf8',
    backgroundColor: '#0ea5e920',
  },
  scoreOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94a3b8',
  },
  scoreOptionTextActive: { color: '#38bdf8' },
});