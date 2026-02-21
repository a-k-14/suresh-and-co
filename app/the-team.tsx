import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScrollToTop, useFocusEffect } from '@react-navigation/native';
import { TEAM } from '../src/data/team';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import TeamMemberCard from '../src/components/shared/TeamMemberCard';

export default function TheTeamScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        ref={scrollRef}
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
