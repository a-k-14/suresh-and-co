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

export default function StatsRow() {
  return (
    <View style={styles.container}>
      {STATS.map((stat, i) => (
        <MotiView
          key={stat.label}
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: i * 120 }}
          style={styles.statItem}
        >
          <CountUpNumber target={stat.value} suffix={stat.suffix} />
          <Text style={styles.statLabel}>{stat.label}</Text>
        </MotiView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.blueSurface,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 28,
    color: colors.brandBlue,
    lineHeight: 34,
  },
  statLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
