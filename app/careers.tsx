import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { colors } from '../src/theme/colors';

const INJECTED_JS = `
  (function() {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    var style = document.createElement('style');
    style.innerHTML = 'body { overflow-x: hidden !important; width: 100vw !important; } * { max-width: 100vw !important; box-sizing: border-box !important; }';
    document.head.appendChild(style);
  })();
  true; // note: this is required, or you'll sometimes get silent failures
`;

export default function CareersScreen() {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.brandBlue} size="large" />
        </View>
      )}
      <WebView
        source={{ uri: 'https://sureshandco.com/careers/' }}
        style={styles.web}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        scalesPageToFit={true}
        showsHorizontalScrollIndicator={false}
        containerStyle={{ overflow: 'hidden' }}
        injectedJavaScript={INJECTED_JS}
        javaScriptEnabled={true}
        startInLoadingState={true}
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
