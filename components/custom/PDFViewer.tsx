import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import Pdf from "react-native-pdf";

interface PDFViewerProps {
  githubpdfUrl: string;
  title?: string;
}

export default function PDFViewerFromAsset({ githubpdfUrl, title }: PDFViewerProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [fileUri, setFileUri] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    const loadPdf = async () => {
      if (!githubpdfUrl) return;

      try {
        setLoading(true);

        if (githubpdfUrl.startsWith("http")) {
          const filePath = FileSystem.cacheDirectory + "temp.pdf";
          const downloaded = await FileSystem.downloadAsync(githubpdfUrl, filePath);
          if (isMounted) setFileUri(downloaded.uri);
        } else {
          if (isMounted) setFileUri(githubpdfUrl);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || "Failed to load PDF");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, [githubpdfUrl]);

  if (loading) {
    return (
      <View style={[styles.loader, { backgroundColor: isDark ? "#111" : "#fdfaf6" }]}>
        <ActivityIndicator size="large" color="#FF9500" />
        <Text style={[styles.loadingText, { color: isDark ? "#fff" : "#333" }]}>Loading PDF...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.fallbackContainer, { backgroundColor: isDark ? "#111" : "#fffaf0" }]}>
        <Ionicons name="alert-circle" size={50} color="#ff4d4f" />
        <Text style={[styles.fallbackText, { color: "#ff4d4f" }]}>⚠️ {error}</Text>
        <Text style={[styles.fallbackHint, { color: isDark ? "#ccc" : "#555" }]}>
          Please check your internet connection or try again later.
        </Text>
      </View>
    );
  }

  if (!fileUri) {
    return (
      <View style={[styles.fallbackContainer, { backgroundColor: isDark ? "#111" : "#fffaf0" }]}>
        <Ionicons name="document-text" size={50} color={isDark ? "#888" : "#6c757d"} />
        <Text style={[styles.fallbackText, { color: isDark ? "#fff" : "#333" }]}>PDF file not available</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fdfaf6" }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? "#1f2937" : "#ffa72bff" }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Page Info */}
      {totalPages > 0 && (
        <View style={[styles.pageInfoContainer, { backgroundColor: isDark ? "#1f2937" : "#fff" }]}>
          <Ionicons name="book-outline" size={18} color={isDark ? "#ddd" : "#555"} />
          <Text style={[styles.pageInfo, { color: isDark ? "#ddd" : "#444" }]}>
            Page {currentPage} / {totalPages}
          </Text>
        </View>
      )}

      {/* PDF Viewer */}
      <View style={[styles.card, { backgroundColor: isDark ? "#1f2937" : "#fff" }]}>
        <Pdf
          source={{ uri: fileUri }}
          style={styles.pdf}
          onLoadComplete={(pages) => setTotalPages(pages)}
          onPageChanged={(page) => setCurrentPage(page)}
          onError={(err) => console.log(err)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  backButton: {
    marginRight: 12,
    padding: 6,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
  },

  pageInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  pageInfo: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },

  card: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },

  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  fallbackText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 6,
  },
  fallbackHint: { fontSize: 14, textAlign: "center" },
});
