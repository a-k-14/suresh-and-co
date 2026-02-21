import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useScrollToTop, useFocusEffect } from '@react-navigation/native';
import { RECOGNITIONS } from '../src/data/constants';
import { colors } from '../src/theme/colors';
import { spacing, radius } from '../src/theme/spacing';

export default function RecognitionScreen() {
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
        {RECOGNITIONS.map((item, i) => (
          <MotiView
            key={item.id}
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 450, delay: i * 80 }}
            style={styles.card}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={28}
                color={colors.textOnBlue}
              />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          </MotiView>
        ))}
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
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brandBlue,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textWrap: { flex: 1 },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: colors.brandBlue,
    marginBottom: spacing.xs,
  },
  desc: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 21,
  },
});
