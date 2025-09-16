import { Link, Stack } from 'expo-router';
import { StyleSheet, Image } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />

      <LinearGradient colors={['#F7F4EF', '#ffeac6ff']} style={{ flex: 1 }}>


        {/* --- Contents --- */}
        <ThemedView style={styles.containers}>
          <Ionicons name="book" size={48} color="#FFA500" />
          <ThemedText style={styles.title}>
            ශ්‍රී ලංකා ත්‍රිපිටක විභාගය
          </ThemedText>
          <ThemedText style={styles.subtitle}>යමෙක් තම සිත පාලනය කරන්නේ නම්, ඔහු සැමවිටම නිවන් පථයේ සිටී.</ThemedText>
        </ThemedView>

        
        {/* --- Logo --- */}
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', marginTop: 50 }}>
          <Image
            source={require('@/assets/logo.png')}
            style={styles.logo}
          />
        </ThemedView>

        <ThemedView style={styles.container}>
          <ThemedText type="title">It&apos;s not you It&apos;s me!.</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>sorry for the trouble.</ThemedText>

          <ThemedView style={styles.link}>
            <Ionicons name="arrow-back" size={28} color="#2E2E2E" />
            <Link href="/">
              <ThemedText type="link" style={styles.linktext}>Back to Home</ThemedText>
            </Link>
          </ThemedView>

        </ThemedView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  containers: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: -80,
  },
  title: {
    fontSize: 34,
    color: '#2E2E2E',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 42,
  },
  link: {
    marginTop: 15,
    padding: 8,
    width: 240,
    gap: 15,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  linktext: {
    marginLeft: 25,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
});
