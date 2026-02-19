import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Share,
  Platform,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { SOCIAL } from '../../data/constants';
import { openUrl } from '../../utils/launcher';
import PressableScale from '../shared/PressableScale';

const NAV_ITEMS = [
  { label: 'Home', icon: 'home-outline', route: '/' },
  { label: 'Ask Query', icon: 'chatbubble-outline', route: '/ask-query' },
  { label: 'Recognition', icon: 'ribbon-outline', route: '/recognition' },
  { label: 'Insights', icon: 'newspaper-outline', route: '/insights' },
  { label: 'Careers', icon: 'briefcase-outline', route: '/careers' },
];

const SOCIAL_ITEMS = [
  { label: 'Facebook', icon: 'logo-facebook', url: SOCIAL.facebook },
  { label: 'LinkedIn', icon: 'logo-linkedin', url: SOCIAL.linkedin },
  { label: 'YouTube', icon: 'logo-youtube', url: SOCIAL.youtube },
];

export default function AppDrawer(props: DrawerContentComponentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleShare = async () => {
    await Share.share({
      message:
        'Suresh & Co — Chartered Accountants with 50+ years of excellence. Download our app or visit https://sureshandco.com',
    });
  };

  const navigate = (route: string) => {
    props.navigation.closeDrawer();
    router.push(route as never);
  };

  return (
    <View style={styles.root}>
      {/* Drawer header */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Chartered Accountants</Text>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.route;
          return (
            <PressableScale
              key={item.route}
              onPress={() => navigate(item.route)}
              style={[styles.navItem, active && styles.navItemActive]}
            >
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={20}
                color={active ? colors.textOnBlue : colors.brandBlue}
              />
              <Text
                style={[styles.navLabel, active && styles.navLabelActive]}
              >
                {item.label}
              </Text>
            </PressableScale>
          );
        })}

        {/* Follow Us section */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerLabel}>Follow Us</Text>
          <View style={styles.dividerLine} />
        </View>

        {SOCIAL_ITEMS.map((item) => (
          <PressableScale
            key={item.label}
            onPress={() => openUrl(item.url)}
            style={styles.navItem}
          >
            <Ionicons
              name={item.icon as keyof typeof Ionicons.glyphMap}
              size={20}
              color={colors.brandBlue}
            />
            <Text style={styles.navLabel}>{item.label}</Text>
          </PressableScale>
        ))}

        <PressableScale onPress={handleShare} style={styles.navItem}>
          <Ionicons name="share-social-outline" size={20} color={colors.brandBlue} />
          <Text style={styles.navLabel}>Share</Text>
        </PressableScale>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.brandBlue,
    paddingTop: 52,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  subtitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: colors.textOnBlue,
    marginTop: spacing.xs,
    letterSpacing: 0.5,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingVertical: spacing.md,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    borderRadius: 10,
    marginHorizontal: spacing.sm,
    marginBottom: 2,
  },
  navItemActive: {
    backgroundColor: colors.brandBlue,
  },
  navLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    color: colors.textPrimary,
  },
  navLabelActive: {
    color: colors.textOnBlue,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  dividerLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: colors.brandBlue,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
