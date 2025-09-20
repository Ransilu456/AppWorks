import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
/* import { Platform, View } from 'react-native'; */
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

      <StatusBar
        style={isDark ? 'light' : 'dark'} 
      />

     {/* {Platform.OS === 'android' && (
        <View
          style={{
            height: StatusBar.currentHeight, 
            backgroundColor: isDark ? '#000000' : '#F7F4EF',
          }}
        />
      )}*/}

      <LinearGradient
        colors={
          isDark
            ? ['#000000', '#121212'] 
            : ['#F7F4EF', '#FFEAC6'] 
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
