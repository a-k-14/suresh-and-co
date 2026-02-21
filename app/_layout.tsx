import 'react-native-gesture-handler';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, ActivityIndicator } from 'react-native';
import AppDrawer from '../src/components/layout/AppDrawer';
import { colors } from '../src/theme/colors';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  React.useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.brandBlue} size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Drawer
        drawerContent={(props) => <AppDrawer {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: colors.brandBlue },
          headerTintColor: colors.textOnBlue,
          headerTitleStyle: {
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 18,
          },
          drawerType: 'front',
          swipeEnabled: true,
          headerLeft: () => {
            const navigation = require('@react-navigation/native').useNavigation();
            return (
              <Ionicons
                name="menu"
                size={26}
                color={colors.textOnBlue}
                style={{ marginLeft: 16 }}
                onPress={() => navigation.toggleDrawer()}
              />
            );
          },
        }}
      >
        <Drawer.Screen name="index" options={{ title: 'Suresh & Co' }} />
        <Drawer.Screen name="services" options={{ title: 'Our Services' }} />
        <Drawer.Screen name="tax-calculator" options={{ title: 'Tax Calculator' }} />
        <Drawer.Screen name="ask-query" options={{ title: 'Ask Query' }} />
        <Drawer.Screen name="vision-mission" options={{ title: 'Vision & Mission' }} />
        <Drawer.Screen name="the-team" options={{ title: 'The Team' }} />
        <Drawer.Screen name="recognition" options={{ title: 'Recognition' }} />
        <Drawer.Screen name="insights" options={{ title: 'Insights' }} />
        <Drawer.Screen name="careers" options={{ title: 'Careers' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
