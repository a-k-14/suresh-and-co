import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { STATS } from '../../data/constants';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

function CountUpNumber({
  target,
  suffix,
  duration = 1200,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const frame = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    frame.current = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        setCount(target);
        if (frame.current) clearInterval(frame.current);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => {
      if (frame.current) clearInterval(frame.current);
    };
  }, [target, duration]);

  return (
    <Text style={styles.statValue}>
      {count}
      {suffix}
    </Text>
  );
}

import { Ionicons } from '@expo/vector-icons';

export default function StatsRow() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800 }}
        style={styles.statItem}
      >
        <Ionicons name="ribbon-outline" size={24} color={colors.brandBlue} style={styles.icon} />
        <Text style={styles.statValue}>50+</Text>
        <Text style={styles.statLabel}>Years of Professional Trust</Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blueSurface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  statValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: colors.brandBlue,
    marginRight: spacing.xs,
  },
  statLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
});
