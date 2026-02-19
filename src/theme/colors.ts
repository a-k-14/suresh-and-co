export const colors = {
  // Brand blues
  brandBlue: '#1565C0',
  brandBlueDark: '#0D47A1',
  brandBlueLight: '#1E88E5',
  blueSurface: '#E8F0FE',

  // Backgrounds & surfaces
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceGrey: '#F5F7FA',

  // Text
  textPrimary: '#1A1A2E',
  textSecondary: '#5C6B8A',
  textOnBlue: '#FFFFFF',

  // Utility
  divider: '#E3E8F0',
  error: '#D32F2F',
} as const;

export type ColorKey = keyof typeof colors;
