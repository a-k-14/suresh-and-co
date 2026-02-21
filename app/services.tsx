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
import { useLocalSearchParams } from 'expo-router';
import { useScrollToTop, useFocusEffect } from '@react-navigation/native';
import { SERVICES } from '../src/data/services';
import { Service } from '../src/types/service';
import { colors } from '../src/theme/colors';
import { spacing, radius } from '../src/theme/spacing';

interface ServiceAccordionProps {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
}

function ServiceAccordion({ service, isExpanded, onToggle }: ServiceAccordionProps) {
  const height = useSharedValue(0);

  React.useEffect(() => {
    height.value = withTiming(isExpanded ? 200 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [isExpanded]);

  const animStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  return (
    <View style={[styles.item, isExpanded && styles.itemActive]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        style={styles.itemHeader}
      >
        <View style={[styles.iconWrap, isExpanded && styles.iconWrapActive]}>
          <Ionicons
            name={service.icon as keyof typeof Ionicons.glyphMap}
            size={22}
            color={isExpanded ? colors.brandBlue : colors.brandBlue}
          />
        </View>
        <Text style={[styles.itemTitle, isExpanded && styles.itemTitleActive]}>
          {service.title}
        </Text>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={isExpanded ? colors.textOnBlue : colors.textSecondary}
        />
      </TouchableOpacity>
      <Animated.View style={animStyle}>
        <Text style={styles.description}>{service.description}</Text>
      </Animated.View>
    </View>
  );
}

export default function ServicesScreen() {
  const params = useLocalSearchParams<{ expandId?: string }>();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scrollRef = React.useRef<ScrollView>(null);

  useScrollToTop(scrollRef);

  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  React.useEffect(() => {
    if (params.expandId) {
      setExpandedId(params.expandId);
    }
  }, [params.expandId]);

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          Tap a service to learn more about what we offer.
        </Text>
        {SERVICES.map((service) => (
          <ServiceAccordion
            key={service.id}
            service={service}
            isExpanded={expandedId === service.id}
            onToggle={() => toggleService(service.id)}
          />
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
  iconWrapActive: {
    backgroundColor: colors.surface,
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
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  },
});
