import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { TeamMember } from '../../types/team-member';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';

interface Props {
  member: TeamMember;
  index: number;
}

export default function TeamMemberCard({ member, index }: Props) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 450, delay: index * 80 }}
      style={styles.card}
    >
      <View style={styles.avatar}>
        <Ionicons name="person-outline" size={26} color={colors.textOnBlue} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.qualification}>{member.qualification}</Text>
        <Text style={styles.role}>{member.role}</Text>
        <Text style={styles.bio}>{member.bio}</Text>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: colors.brandBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brandBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },
  avatarText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: colors.textOnBlue,
  },
  content: {
    flex: 1,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: colors.brandBlue,
    marginBottom: 2,
  },
  qualification: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: colors.brandBlueLight,
    marginBottom: 2,
  },
  role: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  bio: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 20,
  },
});
