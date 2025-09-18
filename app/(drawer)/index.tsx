import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomButton from '@/components/custom/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const darkColors = ['#000000', '#0a0a0a']; // Pure dark gradient
  const lightColors = ['#F7F4EF', '#ffeac6ff'];

  return (
    <LinearGradient
      colors={isDark ? darkColors : lightColors}
      style={{ flex: 1 }}
    >


      {/* --- Top Menu --- */}
      <ThemedView style={styles.menuBar}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={[
            styles.menuButton,
            {
              backgroundColor: isDark
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.05)',
            },
          ]}
        >
          <Ionicons
            name="menu"
            size={28}
            color={isDark ? '#f3f4f6' : '#2E2E2E'}
          />
        </Pressable>
      </ThemedView>

      {/* --- Contents --- */}
      <ThemedView style={styles.container}>
        <Ionicons
          name="book"
          size={48}
          color={isDark ? '#FACC15' : '#FFA500'}
        />
        <ThemedText
          style={[styles.title, { color: isDark ? '#f9fafb' : '#1F2937' }]}
        >
          ශ්‍රී ලංකා ත්‍රිපිටක විභාගය
        </ThemedText>
        <ThemedText
          style={[styles.subtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}
        >
          යමෙක් තම සිත පාලනය කරන්නේ නම්, ඔහු සැමවිටම නිවන් පථයේ සිටී.
        </ThemedText>
      </ThemedView>

      {/* --- Logo --- */}
      <ThemedView style={styles.logoContainer}>
        <Image source={require('@/assets/logo.png')} style={styles.logo} />
      </ThemedView>

      {/* --- Button --- */}
      <ThemedView style={styles.buttonContainer}>
        <CustomButton
          title="ආරම්භ කරන්න"
          style={{
            backgroundColor: isDark ? '#18181b' : '#F4B400',
            width: '100%',
            paddingHorizontal: 80,
            paddingVertical: 14,
            borderRadius: 10,
            marginBottom: 40,
          }}
          pressedStyle={{
            backgroundColor: isDark ? '#27272a' : '#F48400',
          }}
          onPress={() => router.replace('/(tabs)')}
        />
      </ThemedView>

      {/* --- Footer --- */}
      <ThemedView style={styles.footer}>
        <ThemedText
          style={[styles.footertitle, { color: isDark ? '#6B7280' : '#6B7280' }]}
        >
          © v1.0.0 • Powered by E - Marketing Paradice
        </ThemedText>
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    paddingTop: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 50,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: -80,
  },
  title: {
    fontSize: 34,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 15,
    backgroundColor: 'transparent',
  },
  footer: {
    padding: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  footertitle: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 0,
    lineHeight: 20,
  },
});
