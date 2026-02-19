import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TEAM } from '../src/data/team';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import TeamMemberCard from '../src/components/shared/TeamMemberCard';

export default function TheTeamScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {TEAM.map((member, i) => (
          <TeamMemberCard key={member.id} member={member} index={i} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surfaceGrey },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
});
