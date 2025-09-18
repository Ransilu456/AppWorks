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

  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      {/* --- StatusBar --- */}
      <StatusBar
        style={isDark ? 'light' : 'dark'} // text/icons color
        backgroundColor={isDark ? '#000000' : '#F7F4EF'} // Android bg
        translucent={false}
      />

      {Platform.OS === 'android' && (
        <View
          style={{
            height: StatusBar.currentHeight, // reserve space for status bar
            backgroundColor: isDark ? '#000000' : '#F7F4EF',
          }}
        />
      )}

      {/* --- Background gradient (light/dark adaptive) --- */}
      <LinearGradient
        colors={
          isDark
            ? ['#000000', '#121212'] // dark mode gradient
            : ['#F7F4EF', '#FFEAC6'] // light mode gradient
        }
        style={{ flex: 1 }}
      >
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
