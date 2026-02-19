import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { colors } from '../src/theme/colors';

export default function InsightsScreen() {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.brandBlue} size="large" />
        </View>
      )}
      <WebView
        source={{ uri: 'https://sureshandco.com/resources/' }}
        style={styles.web}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: colors.background,
  },
  web: { flex: 1 },
});
