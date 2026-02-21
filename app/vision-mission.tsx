import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useScrollToTop, useFocusEffect } from '@react-navigation/native';
import { VISION, MISSION } from '../src/data/constants';
import { colors } from '../src/theme/colors';
import { spacing, radius } from '../src/theme/spacing';
import BlueDivider from '../src/components/shared/BlueDivider';

function InfoCard({
  icon,
  title,
  text,
  delay,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
  delay: number;
}) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay }}
      style={styles.card}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={28} color={colors.textOnBlue} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
    </MotiView>
  );
}

export default function VisionMissionScreen() {
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
        <InfoCard
          icon="eye-outline"
          title="Our Vision"
          text={VISION}
          delay={0}
        />
        <BlueDivider />
        <InfoCard
          icon="rocket-outline"
          title="Our Mission"
          text={MISSION}
          delay={150}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surfaceGrey },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: 'center',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.brandBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: colors.brandBlue,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  cardText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 25,
    textAlign: 'center',
  },
});
