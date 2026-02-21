import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useScrollToTop, useFocusEffect } from '@react-navigation/native';
import { CONTACT, QUERY_CATEGORIES } from '../src/data/constants';
import { colors } from '../src/theme/colors';
import { spacing, radius } from '../src/theme/spacing';
import { openEmail } from '../src/utils/launcher';
import PressableScale from '../src/components/shared/PressableScale';

export default function AskQueryScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const [category, setCategory] = useState('General');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Missing title', 'Please enter a subject for your query.');
      return;
    }
    const subject = `[${category}] ${title.trim()}`;
    const body = `Category: ${category}\n\nQuery:\n${details.trim()}\n\n---\nSent via Suresh & Co App`;
    await openEmail(CONTACT.email, subject, body);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          We'll get back to you within 1–2 business days.
        </Text>

        {/* Category picker */}
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.pickerBtn}
          onPress={() => setShowPicker((v) => !v)}
          activeOpacity={0.8}
        >
          <Text style={styles.pickerBtnText}>{category}</Text>
          <Ionicons
            name={showPicker ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.brandBlue}
          />
        </TouchableOpacity>
        {showPicker && (
          <View style={styles.dropdown}>
            {QUERY_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.dropItem, cat === category && styles.dropItemActive]}
                onPress={() => {
                  setCategory(cat);
                  setShowPicker(false);
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dropItemText,
                    cat === category && styles.dropItemTextActive,
                  ]}
                >
                  {cat}
                </Text>
                {cat === category && (
                  <Ionicons name="checkmark" size={16} color={colors.textOnBlue} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Title */}
        <Text style={[styles.label, { marginTop: spacing.md }]}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Brief title of your query"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
        />

        {/* Details */}
        <Text style={[styles.label, { marginTop: spacing.md }]}>Details</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Describe your query in detail…"
          placeholderTextColor={colors.textSecondary}
          value={details}
          onChangeText={setDetails}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <PressableScale onPress={handleSubmit} style={styles.submitBtn}>
          <Ionicons name="send" size={18} color={colors.textOnBlue} />
          <Text style={styles.submitBtnText}>SUBMIT QUERY</Text>
        </PressableScale>

        <Text style={styles.or}>or email us directly at</Text>
        <TouchableOpacity onPress={() => openEmail(CONTACT.email)} activeOpacity={0.75}>
          <Text style={styles.emailLink}>{CONTACT.email}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  intro: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  pickerBtn: {
    borderWidth: 1.5,
    borderColor: colors.brandBlue,
    borderRadius: radius.input,
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  pickerBtnText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: radius.input,
    marginTop: 4,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  dropItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  dropItemActive: {
    backgroundColor: colors.brandBlue,
  },
  dropItemText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: colors.textPrimary,
  },
  dropItemTextActive: {
    color: colors.textOnBlue,
    fontFamily: 'Poppins_600SemiBold',
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.divider,
    borderRadius: radius.input,
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceGrey,
  },
  multiline: {
    height: 140,
    paddingTop: 13,
  },
  submitBtn: {
    backgroundColor: colors.brandBlue,
    borderRadius: radius.button,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  submitBtnText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: colors.textOnBlue,
    letterSpacing: 0.8,
  },
  or: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  emailLink: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: colors.brandBlue,
    textAlign: 'center',
    marginTop: 4,
    textDecorationLine: 'underline',
  },
});
