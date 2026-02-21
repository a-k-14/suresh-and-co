import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScrollToTop, useFocusEffect } from '@react-navigation/native';
import HeroHeader from '../src/components/home/HeroHeader';
import StatsRow from '../src/components/home/StatsRow';
import AskExpertBanner from '../src/components/home/AskExpertBanner';
import AboutSection from '../src/components/home/AboutSection';
import ServicesGrid from '../src/components/home/ServicesGrid';
import ContactSection from '../src/components/home/ContactSection';
import { colors } from '../src/theme/colors';

export default function HomeScreen() {
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
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HeroHeader />
        <StatsRow />
        <AskExpertBanner />
        <AboutSection />
        <ServicesGrid />
        <ContactSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.surfaceGrey,
  },
  content: {
    flexGrow: 1,
  },
});
