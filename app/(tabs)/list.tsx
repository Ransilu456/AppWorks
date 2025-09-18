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
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedView } from "@/components/ThemedView";

interface DownloadItem {
  title: string;
  exam: string;
  category: string;
  uri: string;
}

export default function DownloadsTab() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = getStyles(isDark);

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
        {
          backgroundColor: isDark ? "#000000" : "#fff",
          borderColor: isDark ? "#222" : "#eee",
        },
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
          <Text style={[styles.title, { color: isDark ? "#fff" : "#222" }]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.meta, { color: isDark ? "#999" : "#777" }]} numberOfLines={1}>
            {item.exam} • {item.category}
          </Text>
        </View>
      </TouchableOpacity>

      <Pressable onPress={() => deletePdf(item)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={22} color="#fff" />
      </Pressable>
    </View>
  );

  const renderHeader = () =>
    downloads.length > 0 ? (
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={isDark ? "#fff" : "#000"} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>ප්‍රශ්න පත්‍ර තොරතුරු</ThemedText>
        <View style={{ width: 24 }} /> 
      </View>
    ) : null;

  return isDark ? (
    <View style={[styles.container, { backgroundColor: "#000000" }]}>
     <ThemedView style={{backgroundColor: 'transparent'}}>
       {renderHeader()}
     </ThemedView>
      {downloads.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-open" size={60} color="#fac400ff" />
          <ThemedText style={[styles.emptyText, { color: "#fff" }]}>
            📁 ප්‍රශ්න පත්‍ර බාගත කර නොමැත.
          </ThemedText>
          <ThemedText style={[styles.emptySubText, { color: "#888" }]}>
            කරුණාකර ප්‍රශ්න බාගත කරගන්න.
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
  ) : (
    <LinearGradient colors={["#F7F4EF", "#ffeac6ff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        {renderHeader()}
        {downloads.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open" size={60} color="#fac400ff" />
            <ThemedText style={[styles.emptyText, { color: "#000" }]}>
              📁 ප්‍රශ්න පත්‍ර බාගත කර නොමැත.
            </ThemedText>
            <ThemedText style={[styles.emptySubText, { color: "#696969" }]}>
              කරුණාකර ප්‍රශ්න බාගත කරගන්න.
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

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      justifyContent: "space-between",
      width: "100%",
      borderRadius: 46,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: isDark ? "#0f0f0f" : "#fff",
      borderWidth: isDark ? 1 : 0,
      borderColor: isDark ? "#222" : "transparent",
    },
    backBtn: {
      padding: 8,
      borderRadius: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: isDark ? "#f5f5f5" : "#000",
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
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    emptyText: {
      fontSize: 24,
      fontWeight: "600",
      marginTop: 16,
      textAlign: "center",
      lineHeight: 30,
    },
    emptySubText: { fontSize: 16, marginTop: 4, textAlign: "center" },
  });
