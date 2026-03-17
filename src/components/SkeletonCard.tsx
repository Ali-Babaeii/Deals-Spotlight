import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function SkeletonCard() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <View style={[styles.bone, styles.brandBone]} />
          <View style={[styles.bone, styles.titleBone]} />
        </View>
        <View style={[styles.bone, styles.scoreBone]} />
      </View>
      <View style={styles.footer}>
        <View style={[styles.bone, styles.priceBone]} />
        <View style={[styles.bone, styles.discountBone]} />
      </View>
    </Animated.View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  titleBlock: { flex: 1, gap: 6 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bone: { backgroundColor: '#334155', borderRadius: 6 },
  brandBone: { height: 10, width: 60 },
  titleBone: { height: 16, width: '80%' },
  scoreBone: { height: 50, width: 50, borderRadius: 10 },
  priceBone: { height: 22, width: 80 },
  discountBone: { height: 22, width: 55, borderRadius: 20 },
});