import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ABOUT_PARAGRAPHS } from '../../data/constants';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';
import SectionHeader from '../shared/SectionHeader';

export default function AboutSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionHeader title="About Us" />
      <Text style={styles.body}>{ABOUT_PARAGRAPHS[0]}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => router.push('/vision-mission')}
          activeOpacity={0.75}
        >
          <Ionicons name="compass-outline" size={18} color={colors.brandBlue} style={styles.btnIcon} />
          <Text style={styles.outlineBtnText}>Vision & Mission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => router.push('/the-team')}
          activeOpacity={0.75}
        >
          <Ionicons name="people-outline" size={18} color={colors.brandBlue} style={styles.btnIcon} />
          <Text style={styles.outlineBtnText}>The Team</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  body: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.brandBlue,
    borderRadius: radius.button,
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  btnIcon: {
    marginRight: spacing.sm,
  },
  outlineBtnText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: colors.brandBlue,
    flex: 1,
    textAlign: 'center',
    marginRight: 18, // Offset the icon width to keep text centered
  },
});
