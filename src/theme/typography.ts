import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  display: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 28,
    lineHeight: 36,
    color: colors.textPrimary,
  },
  headline: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    lineHeight: 30,
    color: colors.textPrimary,
  },
  title: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  body: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  caption: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  button: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
    color: colors.textOnBlue,
  },
});
