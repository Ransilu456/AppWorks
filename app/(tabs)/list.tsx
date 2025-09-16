import { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import * as FileSystem from "expo-file-system";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";

interface DownloadItem {
  title: string;
  exam: string;
  category: string;
  uri: string;
}

export default function DownloadsTab() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const router = useRouter();
  const colorScheme = useColorScheme(); // detect system theme
  const isDark = colorScheme === "dark";

  useFocusEffect(
    useCallback(() => {
      const loadDownloads = async () => {
        try {
          const existing = await AsyncStorage.getItem("downloads");
          if (existing) setDownloads(JSON.parse(existing));
          else setDownloads([]);
        } catch (err) {
          console.error("Failed to load downloads", err);
        }
      };
      loadDownloads();
    }, [])
  );

  const deletePdf = async (item: DownloadItem) => {
    Alert.alert("Delete PDF", `Are you sure you want to delete "${item.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(item.uri, { idempotent: true });
            const updated = downloads.filter((d) => d.uri !== item.uri);
            await AsyncStorage.setItem("downloads", JSON.stringify(updated));
            setDownloads(updated);
          } catch (err) {
            console.error("Failed to delete PDF", err);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: DownloadItem }) => (
    <View
      style={[
        styles.item,
        { backgroundColor: isDark ? "#070b13ff" : "#fff", borderColor: isDark ? "#333" : "#eee" },
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
        activeOpacity={0.7}
        onPress={() => {
          const encodedLink = encodeURIComponent(item.uri);
          const encodedTitle = encodeURIComponent(item.title);
          router.push(`/pdf_viewer?paperLink=${encodedLink}&paperTitle=${encodedTitle}`);
        }}
      >
        <Ionicons
          name="document-text-outline"
          size={28}
          color={isDark ? "#FFD479" : "#FF9500"}
          style={{ marginRight: 12 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: isDark ? "#eee" : "#222" }]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.meta, { color: isDark ? "#aaa" : "#777" }]} numberOfLines={1}>
            {item.exam} • {item.category}
          </Text>
        </View>
      </TouchableOpacity>

      <Pressable onPress={() => deletePdf(item)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={22} color="#fff" />
      </Pressable>
    </View>
  );

  return (
    <LinearGradient
      colors={
        isDark ? ['#111827', '#1f2937'] : ['#F7F4EF', '#ffeac6ff']
      }
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          <Pressable onPress={() => router.push("/(drawer)")} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={isDark ? "#fff" : "#2E2E2E"} />
          </Pressable>
          <ThemedText
            style={[styles.headerTitle, { color: isDark ? "#fff" : "#2E2E2E" }]}
          >
            Downloaded PDFs
          </ThemedText>
        </ThemedView>

        {downloads.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="folder-open-outline"
              size={60}
              color={isDark ? "#555" : "#ccc"}
            />
            <ThemedText
              style={[styles.emptyText, { color: isDark ? "#888" : "#999" }]}
            >
              No downloads yet
            </ThemedText>
            <ThemedText
              style={[styles.emptySubText, { color: isDark ? "#666" : "#bbb" }]}
            >
              Download PDFs to see them here.
            </ThemedText>
          </View>
        ) : (
          <FlatList
            data={downloads}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 20, backgroundColor: "transparent" },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 45,
  },
  backButton: { padding: 8, borderRadius: 8, backgroundColor: "transparent", marginRight: 12 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "600" },
  meta: { fontSize: 13, marginTop: 2 },

  deleteButton: {
    padding: 8,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 60 },
  emptyText: { fontSize: 18, fontWeight: "600", marginTop: 16 },
  emptySubText: { fontSize: 14, marginTop: 4, textAlign: "center" },
});
