import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomButton from '@/components/custom/CustomButton';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';

export default function PapersTab() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { exam, category, paperTitle, paperLink, part, year } =
    useLocalSearchParams<{
      exam: string;
      category: string;
      paperTitle: string;
      paperLink: string;
      part?: string;
      year?: string;
    }>();

  const styles = getStyles(isDark);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setProgress(0);

      const safe = (val?: string) => val ? val.replace(/\s+/g, "_") : "";

      // Base filename with details
      const baseName = [
        safe(paperTitle),
        safe(category),
        safe(year),
        safe(part),
      ].filter(Boolean).join("_");

      // Add timestamp to avoid overwrite
      const uniqueSuffix = Date.now();
      const fileName = `${baseName}_${uniqueSuffix}.pdf`;

      const downloadUri = FileSystem.documentDirectory + fileName;

      const downloadResumable = FileSystem.createDownloadResumable(
        paperLink,
        downloadUri,
        {},
        (downloadProgress) => {
          const pct =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setProgress(pct);
        }
      );

      const result = await downloadResumable.downloadAsync();
      if (!result || result.status !== 200) {
        throw new Error("Download failed with status " + result?.status);
      }

      const newEntry = {
        title: paperTitle,
        category,
        exam,
        uri: result.uri, // ✅ unique and correct path
        part,
        year,
        date: new Date().toISOString(),
      };

      let existing = await AsyncStorage.getItem("downloads");
      let downloads = existing ? JSON.parse(existing) : [];
      downloads.push(newEntry);
      await AsyncStorage.setItem("downloads", JSON.stringify(downloads));

      alert("✅ File downloaded successfully!");
    } catch (err: any) {
      console.error("❌ Error downloading file:", err);
      alert("❌ Failed to download the file. Please try again.");
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };


  if (!exam || !category || !paperTitle) {
    return (
      <LinearGradient
        colors={isDark ? ['#000000', '#0a0a0a'] : ['#F7F4EF', '#ffeac6ff']}
        style={styles.gradient}
      >
        <ThemedView style={styles.centered}>

          <Ionicons
            name="alert-circle-outline"
            size={70}
            color={isDark ? "#ff6b6b" : "#ff0000"}
            style={{ marginBottom: 16 }}
          />
          <ThemedText style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
            📁 ප්‍රශ්න පත්‍රය තෝරා නොමැත.
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: isDark ? "#aaa" : "#555" }]}>
            කරුණාකර නැවත ගොස් තෝරන්න.
          </ThemedText>
        </ThemedView>
      </LinearGradient>
    );
  }


  return (
    <LinearGradient
      colors={
        isDark ? ['#000000', '#0a0a0a'] : ['#F7F4EF', '#ffeac6ff']
      }
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40, backgroundColor: 'transparent' }}>
        <ThemedView style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={isDark ? "#fff" : "#000"} />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>
              ප්‍රශ්න පත්‍ර තොරතුරු
            </ThemedText>
            <View style={{ width: 24 }} />
          </View>

          {/* Paper Preview */}
          <View style={styles.imageWrapper}>
            <ImageBackground
              source={require("@/assets/background_app.jpeg")}
              style={styles.imageHeader}
              imageStyle={styles.imageRounded}
            >
              <BlurView intensity={60} tint={isDark ? "dark" : "light"} style={styles.overlay}>
                <ThemedText style={styles.PaperName}>{paperTitle}</ThemedText>
                <ThemedText style={styles.PdfCategory}>{category}</ThemedText>
                <ThemedText style={styles.PdfPrice}>Free</ThemedText>
              </BlurView>
            </ImageBackground>
          </View>

          {/* Card */}
          <ThemedView style={styles.card}>
            <ThemedView style={styles.row}>
              <Ionicons name="school-outline" size={22} color={isDark ? "#ddd" : "#333"} />
              <ThemedText style={styles.info}>Exam: {exam}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.separator} />

            <ThemedView style={styles.row}>
              <Ionicons name="layers-outline" size={22} color={isDark ? "#ddd" : "#333"} />
              <ThemedText style={styles.info}>Category: {category}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.separator} />

            <ThemedView style={styles.row}>
              <Ionicons name="document-text-outline" size={22} color={isDark ? "#ddd" : "#333"} />
              <ThemedText style={styles.info}>Paper: {paperTitle}</ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Buttons */}
          <CustomButton
            title="පත්‍රය බලන්න"
            icon={<Ionicons name="eye" size={20} color="#fff" style={{ marginRight: 8 }} />}
            style={[styles.button, styles.viewButton]}
            onPress={() => {
              const encodedLink = encodeURIComponent(paperLink);
              const encodedTitle = encodeURIComponent(paperTitle);
              const encodedYear = encodeURIComponent(year || "");
              const encodedPart = encodeURIComponent(part || "");

              router.push(
                `/pdf_viewer?paperLink=${encodedLink}&paperTitle=${encodedTitle}&year=${encodedYear}&part=${encodedPart}`
              );
            }}
            pressedStyle={{ backgroundColor: isDark ? '#444' : '#333' }}
          />

          <CustomButton
            title={
              downloading
                ? progress > 0
                  ? `බාගැනේ (${Math.round(progress * 100)}%)`
                  : "බාගැනේ..."
                : "පත්‍රය බාගන්න"
            }
            icon={
              downloading ? (
                <ActivityIndicator size="small" color="#fff" style={{ marginRight: 12 }} />
              ) : (
                <Ionicons
                  name="download"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 12 }}
                />
              )
            }
            style={[
              styles.button,
              styles.downloadButton,
              downloading ? { opacity: 0.7 } : {},
            ]}
            onPress={handleDownload}
            disabled={downloading}
            pressedStyle={{ backgroundColor: isDark ? "#111" : "#222" }}
          />
        </ThemedView>
      </ScrollView>
    </LinearGradient>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    gradient: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'transparent',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      justifyContent: 'space-between',
      width: '100%',
      borderRadius: 46,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: isDark ? '#0f0f0f' : '#fff',
      borderWidth: isDark ? 1 : 0,
      borderColor: isDark ? '#222' : 'transparent',
    },
    backBtn: {
      padding: 8,
      borderRadius: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: isDark ? '#f5f5f5' : '#000',
    },
    title: { fontSize: 24, fontWeight: '700', textAlign: 'center', lineHeight: 30 },
    subtitle: { fontSize: 16, marginTop: 6, textAlign: 'center', lineHeight: 30 },
    info: { fontSize: 16, marginLeft: 10, color: isDark ? '#bbb' : '#333' },
    card: {
      width: '100%',
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      backgroundColor: isDark ? '#111' : '#fff',
      borderWidth: isDark ? 1 : 0,
      borderColor: isDark ? '#222' : 'transparent',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
      backgroundColor: 'transparent',
    },
    separator: {
      height: 1,
      backgroundColor: isDark ? '#333' : '#ececec',
      marginVertical: 6,
    },
    button: {
      width: '100%',
      paddingVertical: 14,
      borderRadius: 10,
      marginTop: 14,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewButton: {
      backgroundColor: isDark ? '#ffb300' : '#ffc400',
    },
    downloadButton: {
      marginBottom: 40,
      backgroundColor: isDark ? '#000' : '#000',
    },
    imageWrapper: {
      width: '100%',
      marginVertical: 20,
      borderRadius: 24,
      overflow: 'hidden',
     /* shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 6,*/
    },
    imageHeader: {
      height: 260,
      justifyContent: 'flex-end',
    },
    imageRounded: {
      borderRadius: 24,
    },
    overlay: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.3)' : 'transparent',
    },
    PaperName: {
      fontSize: 22,
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
    PdfCategory: {
      fontSize: 15,
      color: '#ccc',
      marginTop: 2,
      backgroundColor: 'transparent',
    },
    PdfPrice: {
      fontSize: 18,
      color: '#fff',
      marginTop: 8,
      fontWeight: '600',
      backgroundColor: 'transparent',
    },
  });
