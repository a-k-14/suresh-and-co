import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function HeroHeader() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: -16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600 }}
        style={styles.content}
      >
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Ever lasting relationship</Text>
        <Text style={styles.sub}>Chartered Accountants · Est. 1974</Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 100,
  },
  tagline: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: colors.textPrimary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  sub: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    letterSpacing: 0.3,
  },
});
