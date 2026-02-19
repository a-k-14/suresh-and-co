import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/spacing';
import PressableScale from '../shared/PressableScale';

export default function AskExpertBanner() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <PressableScale
        onPress={() => router.push('/ask-query')}
        style={styles.card}
      >
        <MotiView
          from={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 1000,
            loop: true,
          }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.iconWrap}>
          <Ionicons name="chatbubbles" size={32} color={colors.textOnBlue} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.heading}>Talk to an Expert</Text>
          <Text style={styles.sub}>Send us your query — we'll respond promptly</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={colors.textOnBlue} />
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  card: {
    backgroundColor: colors.brandBlue,
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    overflow: 'hidden',
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brandBlueDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: colors.textOnBlue,
  },
  sub: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
});
