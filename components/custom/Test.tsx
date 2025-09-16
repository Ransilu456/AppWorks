import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/custom/CustomButton';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { BlurView } from 'expo-blur';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function PaperScreen() {
  const router = useRouter();
  const { exam, category, paperTitle, paperLink } = useLocalSearchParams<{
    exam: string;
    category: string;
    paperTitle: string;
    paperLink: string;
  }>();

  const handleDownload = async () => {
    try {
      const fileName = paperTitle.replace(/\s+/g, '_') + '.pdf';
      const downloadUri = FileSystem.documentDirectory + fileName;

      const downloadResult = await FileSystem.downloadAsync(paperLink, downloadUri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(downloadResult.uri);
      } else {
        alert('Downloaded file saved, but sharing is not available.');
      }
    } catch (err) {
      console.error('❌ Error downloading file:', err);
      alert('Failed to download the file.');
    }
  };

  if (!exam || !category || !paperTitle || !paperLink) {
    return (
      <ThemedView style={[styles.centered, { padding: 32 }]}>
        <Ionicons name="alert-circle-outline" size={60} color="#444" style={{ marginBottom: 20 }} />
        <ThemedText style={styles.title}>📄 No paper selected</ThemedText>
        <ThemedText style={styles.info}>Please go back and select a paper.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerImage={
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2' }}
          style={styles.imageHeader}
          imageStyle={styles.imageRounded}
        >
          <BlurView intensity={40} tint="light" style={styles.backBtnBlur} />
          <BlurView intensity={50} tint="dark" style={styles.overlay}>
            <ThemedText style={styles.placeName}>{paperTitle}</ThemedText>
            <ThemedText style={styles.placeLocation}>{category}</ThemedText>
            <ThemedText style={styles.placePrice}>Free</ThemedText>
          </BlurView>
        </ImageBackground>
      }
      headerBackgroundColor={{ light: '#ffeac6ff', dark: '#333' }}
    >
      {/* Header bar */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Paper Details</ThemedText>
        <ThemedView style={{ width: 26 }} />
      </ThemedView>

      {/* Paper info card */}
      <ThemedView style={styles.card}>
        <ThemedView style={styles.row}>
          <Ionicons name="school-outline" size={22} color="#333" />
          <ThemedText style={styles.info}>Exam: {exam}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.separator} />

        <ThemedView style={styles.row}>
          <Ionicons name="layers-outline" size={22} color="#333" />
          <ThemedText style={styles.info}>Category: {category}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.separator} />

        <ThemedView style={styles.row}>
          <Ionicons name="document-text-outline" size={22} color="#333" />
          <ThemedText style={styles.info}>Paper: {paperTitle}</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Action buttons */}
      <CustomButton
        title="View Paper"
        icon={<Ionicons name="eye" size={20} color="#fff" style={{ marginRight: 8 }} />}
        style={[styles.button, styles.viewButton]}
        onPress={() => {
          const encodedLink = encodeURIComponent(paperLink);
          router.push(`/pdf_viewer?paperLink=${encodedLink}`);
        }}
        pressedStyle={{ backgroundColor: '#444' }}
      />

      <CustomButton
        title="Download Paper"
        icon={<Ionicons name="download" size={20} color="#fff" style={{ marginRight: 8 }} />}
        style={[styles.button, styles.downloadButton]}
        onPress={handleDownload}
        pressedStyle={{ backgroundColor: '#000' }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6',
    marginVertical: 6,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
  },
  viewButton: {
    marginTop: 40,
    backgroundColor: '#ffc400ff',
  },
  downloadButton: {
    backgroundColor: '#000',
    marginTop: 12,
  },

  // Parallax image styles
  imageHeader: {
    height: 300,
    justifyContent: 'space-between',
    padding: 16,
  },
  imageRounded: {
    borderRadius: 0,
  },
  overlay: {
    alignSelf: 'flex-start',
    backgroundColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.4)' : 'transparent',
    borderRadius: 16,
    padding: 12,
    width: '100%',
  },
  backBtnBlur: {
    borderRadius: 100,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  placeName: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  placeLocation: {
    fontSize: 14,
    color: '#eee',
    marginTop: 2,
  },
  placePrice: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
    fontWeight: '600',
  },
});
