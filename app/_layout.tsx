import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar translucent style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {Platform.OS === 'android' && (
        <View
          style={{
            backgroundColor: 'transparent',
          }}
        />
      )}
      <LinearGradient colors={['#F7F4EF', '#ffeac6ff']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="(drawer)" />
          </Stack>
        </SafeAreaView>
      </LinearGradient>
    </ThemeProvider>
  );
}

export const screenOptions = {
  headerShown: false,
};
