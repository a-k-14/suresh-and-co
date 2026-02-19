import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SERVICES } from '../../data/services';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import SectionHeader from '../shared/SectionHeader';
import ServiceTile from '../shared/ServiceTile';

export default function ServicesGrid() {
  const router = useRouter();

  // Show first 8 (all of them) in 2-column grid
  const rows: (typeof SERVICES)[] = [];
  for (let i = 0; i < SERVICES.length; i += 2) {
    rows.push(SERVICES.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      <SectionHeader title="Our Services" />
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((service, colIdx) => (
            <ServiceTile
              key={service.id}
              service={service}
              index={rowIdx * 2 + colIdx}
              onPress={() => router.push('/services')}
            />
          ))}
          {row.length === 1 && <View style={{ flex: 1, margin: spacing.xs }} />}
        </View>
      ))}
      <TouchableOpacity
        style={styles.viewAll}
        onPress={() => router.push('/services')}
        activeOpacity={0.75}
      >
        <Text style={styles.viewAllText}>View All Services</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.brandBlue} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  row: {
    flexDirection: 'row',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
  },
  viewAllText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: colors.brandBlue,
  },
});
