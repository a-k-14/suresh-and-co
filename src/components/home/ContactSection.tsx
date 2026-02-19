import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CONTACT } from '../../data/constants';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';
import { callPhone, openEmail, openMaps, openUrl } from '../../utils/launcher';
import SectionHeader from '../shared/SectionHeader';
import PressableScale from '../shared/PressableScale';

const ROWS = [
  {
    icon: 'location-outline' as const,
    label: CONTACT.address,
    onPress: () => openMaps(CONTACT.address),
  },
  {
    icon: 'call-outline' as const,
    label: CONTACT.phoneDisplay,
    onPress: () => callPhone(CONTACT.phone),
  },
  {
    icon: 'mail-outline' as const,
    label: CONTACT.email,
    onPress: () => openEmail(CONTACT.email),
  },
  {
    icon: 'globe-outline' as const,
    label: CONTACT.website.replace('https://', ''),
    onPress: () => openUrl(CONTACT.website),
  },
];

export default function ContactSection() {
  return (
    <View style={styles.container}>
      <SectionHeader title="Contact Us" />
      {ROWS.map((row, i) => (
        <PressableScale key={i} onPress={row.onPress} style={styles.row}>
          <View style={styles.iconWrap}>
            <Ionicons name={row.icon} size={20} color={colors.brandBlue} />
          </View>
          <Text style={styles.label} numberOfLines={3}>
            {row.label}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
        </PressableScale>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.blueSurface,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  label: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 20,
  },
});
