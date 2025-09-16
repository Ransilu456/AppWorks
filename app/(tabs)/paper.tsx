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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomButton from '@/components/custom/CustomButton';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';

export default function PapersTab() {
  const router = useRouter();
  const colorScheme = useColorScheme(); // light | dark
  const isDark = colorScheme === 'dark';

  const { exam, category, paperTitle, paperLink, part } =
    useLocalSearchParams<{
      exam: string;
      category: string;
      paperTitle: string;
      paperLink: string;
      part?: string;
    }>();

  let displayTitle = paperTitle;
  if (part) {
    displayTitle += ` - Part ${part}`;
  }

  const gradientColors = isDark
    ? ['#1a1a1a', '#000']
    : ['#fff9f0', '#ffeac6'];

  const styles = getStyles(isDark);

  const handleDownload = async () => {
    try {
      const fileName = paperTitle.replace(/\s+/g, "_") + ".pdf";
      const downloadUri = FileSystem.documentDirectory + fileName;

      const downloadResult = await FileSystem.downloadAsync(paperLink, downloadUri);
      if (!downloadResult || downloadResult.status !== 200) {
        throw new Error("Download failed with status " + downloadResult?.status);
      }

      const newEntry = {
        title: paperTitle,
        category,
        exam,
        uri: downloadResult.uri,
        date: new Date().toISOString(),
      };

      let existing = await AsyncStorage.getItem("downloads");
      let downloads = existing ? JSON.parse(existing) : [];
      downloads.push(newEntry);
      await AsyncStorage.setItem("downloads", JSON.stringify(downloads));

      alert("📁 File downloaded successfully!");
    } catch (err: any) {
      console.error("❌ Error downloading file:", err);

      if (
        err?.message?.includes("Unable to resolve host") ||
        err?.message?.includes("Network request failed")
      ) {
        alert("⚠️ No internet connection. Please check your network and try again.");
      } else if (err?.message?.includes("status")) {
        alert("⚠️ Could not download the file (server error). Try again later.");
      } else {
        alert("❌ Failed to download the file. Please try again.");
      }
    }
  };

  if (!exam || !category || !paperTitle) {
    return (
      <LinearGradient  colors={
        isDark ? ['#111827', '#1f2937'] : ['#F7F4EF', '#ffeac6ff']
      } style={styles.gradient}>
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
            කරනාකර නැවත ගොස් තෝරන්න.
          </ThemedText>
        </ThemedView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient  colors={
        isDark ? ['#111827', '#1f2937'] : ['#F7F4EF', '#ffeac6ff']
      } style={styles.gradient}>
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
              source={{ uri: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2' }}
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
              router.push(`/pdf_viewer?paperLink=${encodedLink}&paperTitle=${encodedTitle}`);
            }}
            pressedStyle={{ backgroundColor: isDark ? '#444' : '#333' }}
          />

          <CustomButton
            title="පත්‍රය බාගන්න"
            icon={<Ionicons name="download" size={20} color="#fff" style={{ marginRight: 18 }} />}
            style={[styles.button, styles.downloadButton]}
            onPress={handleDownload}
            pressedStyle={{ backgroundColor: isDark ? '#111' : '#222' }}
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
      backgroundColor: isDark ? '#111' : '#fff',
    },
    backBtn: {
      padding: 8,
      borderRadius: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: isDark ? '#fff' : '#000',
    },
    title: { fontSize: 24, fontWeight: '700', textAlign: 'center', lineHeight: 30 },
    subtitle: { fontSize: 16, marginTop: 6, textAlign: 'center', lineHeight: 30 },
    info: { fontSize: 16, marginLeft: 10, color: isDark ? '#ddd' : '#333' },
    card: {
      width: '100%',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#00000020',
      shadowOpacity: 0.12,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 4,
      marginBottom: 20,
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
      backgroundColor: 'transparent',
    },
    separator: {
      height: 1,
      backgroundColor: '#ececec20',
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
      backgroundColor: isDark ? '#222' : '#000',
    },
    imageWrapper: {
      width: '100%',
      marginVertical: 20,
      borderRadius: 24,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 6,
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
      backgroundColor: Platform.OS === 'android' ? 'rgba(14, 14, 14, 0.15)' : 'transparent',
    },
    PaperName: {
      fontSize: 22,
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
    PdfCategory: {
      fontSize: 15,
      color: '#ddd',
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
