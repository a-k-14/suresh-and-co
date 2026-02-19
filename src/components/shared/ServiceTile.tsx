import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Service } from '../../types/service';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';
import PressableScale from './PressableScale';

interface Props {
  service: Service;
  index: number;
  onPress?: (service: Service) => void;
}

export default function ServiceTile({ service, index, onPress }: Props) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400, delay: index * 60 }}
      style={styles.wrapper}
    >
      <PressableScale onPress={() => onPress?.(service)} style={styles.tile}>
        <Ionicons
          name={service.icon as keyof typeof Ionicons.glyphMap}
          size={30}
          color={colors.textOnBlue}
        />
        <Text style={styles.label} numberOfLines={2}>
          {service.shortTitle}
        </Text>
      </PressableScale>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: spacing.xs,
  },
  tile: {
    backgroundColor: colors.brandBlue,
    borderRadius: radius.tile,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    gap: spacing.sm,
  },
  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: colors.textOnBlue,
    textAlign: 'center',
  },
});
