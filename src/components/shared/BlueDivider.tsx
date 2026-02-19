import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function BlueDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 2,
    backgroundColor: colors.blueSurface,
    borderRadius: 1,
    marginVertical: spacing.lg,
  },
});
