import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import {
  StyleSheet,
  Pressable,
  ScrollView,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const sevaawa = [
  'සමාජ මාධ්‍ය කළමනාකරණය',
  'වෙබ් සංවර්ධනය',
  'ජංගම යෙදුම් සංවර්ධනය',
  'ග්‍රැෆික් සැලසුම් කිරීම',
  'ඩිජිටල් වෙළඳපොළ',
  'ලේඛන සැකසුම්',
  'සියළුම පරිගණක සම්බන්ධිත වැඩ',
];

export default function SevaawaScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <LinearGradient
      colors={isDark ? ['#000000', '#0a0a0a'] : ['#F7F4EF', '#FFEAC6']}
      style={{ flex: 1 }}
    >
      {/* Menu bar */}
      <ThemedView style={styles.menuBar}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={[
            styles.menuButton,
            { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)' },
          ]}
        >
          <Ionicons
            name="menu"
            size={28}
            color={isDark ? '#f3f4f6' : '#2E2E2E'}
          />
        </Pressable>
      </ThemedView>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText
          type="title"
          style={[styles.title, { color: isDark ? '#f9fafb' : '#2E2E2E' }]}
        >
          අපගේ සේවාවන්
        </ThemedText>

        <ThemedText
          style={[styles.description, { color: isDark ? '#d1d5db' : '#4F4F4F' }]}
        >
          <ThemedText
            style={[styles.highlight, { color: isDark ? '#f9fafb' : '#000' }]}
          >
            E Marketing Paradice
          </ThemedText>{' '}
          වෙත ඔබව සාදරයෙන් පිළිගනිමු. අපගේ අරමුණ වන්නේ ඔබේ ව්‍යාපාරය ඩිජිටල්
          ලොව තුළ නිර්මාණාත්මක සහ විශ්වසනීය විසඳුම් සමඟ වර්ධනය කරවීමයි.
        </ThemedText>

        <View style={styles.servicesContainer}>
          {sevaawa.map((seva, index) => (
            <View
              key={index}
              style={[
                styles.serviceCard,
                {
                  backgroundColor: isDark ? '#111111' : '#FFF',
                },
              ]}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color={isDark ? '#FACC15' : '#FF9F1C'}
              />
              <ThemedText
                style={[styles.serviceText, { color: isDark ? '#f3f4f6' : '#2E2E2E' }]}
              >
                {seva}
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
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
  title: {
    marginTop: 5,
    marginBottom: 16,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  highlight: {
    fontWeight: '800',
    fontSize: 18,
  },
  servicesContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  serviceText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
