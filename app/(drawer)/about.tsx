import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Pressable, StyleSheet, Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function AboutScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <LinearGradient
      colors={isDark ? ['#000000', '#0a0a0a'] : ['#F7F4EF', '#ffeac6ff']}
      style={{ flex: 1 }}
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <Ionicons name="menu" size={28} color={isDark ? '#f3f4f6' : "#2E2E2E"} />
        </Pressable>

        <ThemedText style={[styles.headerTitle, { color: isDark ? '#f3f4f6' : '#000' }]}>
          මෙම යෙදුම පිළිබඳව
        </ThemedText>

        <ThemedView style={{ width: 28 }} />
      </ThemedView>

      {/* Content Card */}
      <ThemedView
        style={[
          styles.card,
          {
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#fff"
          },
        ]}
      >
        {/* Top Section */}
        <ThemedView style={{ alignItems: "center", padding: 10, backgroundColor: 'transparent' }}>
          <Image
            source={require("@/assets/Our_Logo.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />

          <ThemedText
            style={[
              styles.cardTitle,
              { color: isDark ? "#f9fafb" : "#222" },
            ]}
          >
           E - Marketing Paradice Design Lab
          </ThemedText>

          <ThemedText
            style={[
              styles.cardText,
              { color: isDark ? "#d1d5db" : "#555" },
            ]}
          >
            මෙම යෙදුම ශ්‍රී ලංකා රාමඤ්ඤය මහා නිකාය මඟින් පවත්වන ශ්‍රී ලංකා
            ත්‍රිපිටක විභාගයට පෙනී සිටින සියලු දෙනාට අවශ්‍ය පසුගිය ප්‍රශ්න
            පත්‍ර ලබා දීම සිදු කරයි.
          </ThemedText>
        </ThemedView>

        {/* Divider */}
        <ThemedView
          style={{
            height: 1,
            backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb",
            width: "90%",
            marginVertical: 12,
          }}
        />

        {/* Footer */}
        <ThemedView style={styles.bottomContainer}>
          <ThemedText
            style={[styles.version, { color: isDark ? "#9CA3AF" : "#666" }]}
          >
            Version: 1.0.0
          </ThemedText>
          <ThemedText
            style={[styles.footer, { color: isDark ? "#6B7280" : "#AAA" }]}
          >
           © {new Date().getFullYear()} E - Marketing Paradice Design Lab.
          </ThemedText>
        </ThemedView>
      </ThemedView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerTitle: { fontSize: 20, fontWeight: '700' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: 'transparent',
  }, 
  card: {
    flex: 1,
    margin: 16,
    padding: 20,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 38,
  },
  cardImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 16,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "400",
    marginTop: 6,
    paddingHorizontal: 14,
    marginBottom: 64,
  },
  bottomContainer: {
    alignItems: "center",
    paddingVertical: 8,
  },
  version: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  footer: {
    fontSize: 14,
    textAlign: 'center',
  },
});
