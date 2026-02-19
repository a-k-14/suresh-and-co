import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SERVICES } from '../src/data/services';
import { Service } from '../src/types/service';
import { colors } from '../src/theme/colors';
import { spacing, radius } from '../src/theme/spacing';

function ServiceAccordion({ service }: { service: Service }) {
  const [expanded, setExpanded] = useState(false);
  const height = useSharedValue(0);

  const toggle = () => {
    if (expanded) {
      height.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) });
    } else {
      height.value = withTiming(200, { duration: 300, easing: Easing.out(Easing.ease) });
    }
    setExpanded((v) => !v);
  };

  const animStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  return (
    <View style={[styles.item, expanded && styles.itemActive]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggle}
        style={styles.itemHeader}
      >
        <View style={styles.iconWrap}>
          <Ionicons
            name={service.icon as keyof typeof Ionicons.glyphMap}
            size={22}
            color={expanded ? colors.textOnBlue : colors.brandBlue}
          />
        </View>
        <Text style={[styles.itemTitle, expanded && styles.itemTitleActive]}>
          {service.title}
        </Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={expanded ? colors.textOnBlue : colors.textSecondary}
        />
      </TouchableOpacity>
      <Animated.View style={animStyle}>
        <Text style={styles.description}>{service.description}</Text>
      </Animated.View>
    </View>
  );
}

export default function ServicesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          Tap a service to learn more about what we offer.
        </Text>
        {SERVICES.map((service) => (
          <ServiceAccordion key={service.id} service={service} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surfaceGrey },
  scroll: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  intro: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  item: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,
    overflow: 'hidden',
  },
  itemActive: {
    backgroundColor: colors.brandBlue,
    borderColor: colors.brandBlue,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.blueSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    flex: 1,
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  itemTitleActive: {
    color: colors.textOnBlue,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 21,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
