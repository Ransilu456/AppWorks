import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Pressable, StyleSheet, View, ScrollView, Alert, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import examsDataRaw from '../../data/data.json';
import CustomButton from '@/components/custom/CustomButton';

type Paper = { part?: number; year: number; paper_title: string; link: string };
type ExamCategory = {
  name: string;
  papers: Paper[];
};
type Exam = { title: string; categories: ExamCategory[] };

const examsData = examsDataRaw as Exam[];

export default function GetStartTab() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [searchText, setSearchText] = useState('');
  const [selectedExam, setSelectedExam] = useState(examsData[0]?.title ?? '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedPart, setSelectedPart] = useState<string>('');

  const filteredExams = useMemo(() => {
    if (!searchText.trim()) return examsData;
    return examsData.filter((exam) =>
      exam.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const selectedExamObj = examsData.find((e) => e.title === selectedExam);
  const categories = selectedExamObj?.categories ?? [];
  const selectedCategoryObj = categories.find((c) => c.name === selectedCategory);
  const papers = selectedCategoryObj?.papers ?? [];

  const uniqueYearPapers = useMemo(() => {
    const map = new Map<number, Paper>();
    papers.forEach((p) => {
      if (!map.has(p.year)) {
        map.set(p.year, p);
      }
    });
    return Array.from(map.values());
  }, [papers]);


  const selectedYearPapers = useMemo(() => {
    if (!selectedYear) return [];
    const year = parseInt(selectedYear);

    return papers.filter((p) => p.year === year);
  }, [selectedYear, papers]);

  const selectedPaper =
    selectedYearPapers.length > 0 ? selectedYearPapers[0] : undefined;

  const availableParts =
    selectedYearPapers.length > 0 && 'part' in selectedYearPapers[0]
      ? (selectedYearPapers as Paper[]).filter((p) => p.part)
      : [];

  return (
    <LinearGradient
      colors={
        isDark ? ['#000000', '#000000'] : ['#F7F4EF', '#ffeac6ff']
      }
      style={{ flex: 1 }}
    >

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.headerContainer}>
          <Pressable
            onPress={() => router.push('/(drawer)')}
            style={[
              styles.backButton,
              isDark && { backgroundColor: 'rgba(255,255,255,0.08)' },
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={isDark ? '#fff' : '#2E2E2E'}
            />
          </Pressable>
        </ThemedView>

        <Ionicons
          name="leaf"
          size={100}
          color={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255, 166, 1, 0.1)'}
          style={styles.leafIcon}
        />

        <ThemedView style={styles.container}>
          <ThemedText style={[styles.title, { color: isDark ? '#f9fafb' : '#1F2937' }]}>
            ශ්‍රී ලංකා ත්‍රිපිටක විභාගයට අදාළ පසුගිය ප්‍රශ්න පත්‍ර
          </ThemedText>

          <ThemedView style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: isDark ? '#e5e7eb' : '#374151' }]}>
              ඔබගේ විභාගය තෝරන්න
            </ThemedText>

            {/* Exam Dropdown */}
            <View style={[styles.dropdownWrapper, isDark && { backgroundColor: '#111', borderColor: '#333' }]}>
              <Picker
                selectedValue={selectedExam}
                onValueChange={(itemValue) => {
                  setSelectedExam(itemValue);
                  setSelectedCategory('');
                  setSelectedYear('');
                  setSelectedPart('');
                }}
                style={[styles.dropdown, { color: isDark ? '#f3f4f6' : '#1F2937' }]}
              >
                {filteredExams.map((exam, idx) => (
                  <Picker.Item key={idx} label={exam.title} value={exam.title} />
                ))}
              </Picker>
            </View>

            {/* Category Dropdown */}
            <View style={[styles.dropdownWrapper, isDark && { backgroundColor: '#111', borderColor: '#333' }]}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => {
                  setSelectedCategory(itemValue);
                  setSelectedYear('');
                  setSelectedPart('');
                }}
                style={[styles.dropdown, { color: isDark ? '#f3f4f6' : '#1F2937' }]}
              >
                <Picker.Item label="කාණ්ඩය තෝරන්න..." value="" />
                {categories.map((cat, idx) => (
                  <Picker.Item key={idx} label={cat.name} value={cat.name} />
                ))}
              </Picker>
            </View>

            {/* Paper Dropdown (Year) */}
            <View style={[styles.dropdownWrapper, isDark && { backgroundColor: '#111', borderColor: '#333' }]}>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue) => {
                  setSelectedYear(itemValue);
                  setSelectedPart('');
                }}
                style={[styles.dropdown, { color: isDark ? '#f3f4f6' : '#1F2937' }]}
              >
                <Picker.Item label="වර්ෂය තෝරන්න..." value="" />
                {uniqueYearPapers.map((paper, idx) => (
                  <Picker.Item
                    key={idx}
                    label={`${paper.paper_title} (${paper.year})`}
                    value={paper.year.toString()}
                  />
                ))}
              </Picker>
            </View>

            {/* Part Dropdown */}
            {availableParts.length > 0 && (
              <View style={[styles.dropdownWrapper, isDark && { backgroundColor: '#111', borderColor: '#333' }]}>
                <Picker
                  selectedValue={selectedPart}
                  onValueChange={setSelectedPart}
                  style={[styles.dropdown, { color: isDark ? '#f3f4f6' : '#1F2937' }]}
                >
                  <Picker.Item label="පත්‍රය තෝරන්න..." value="" />
                  {availableParts.map((p, idx) => (
                    <Picker.Item
                      key={idx}
                      label={`Part ${p.part}`}
                      value={p.part?.toString()}
                    />
                  ))}
                </Picker>
              </View>
            )}

            {/* Selected Info */}
            <ThemedText style={[styles.selectedInfo, { color: isDark ? '#d1d5db' : '#4B5563' }]}>
              {selectedExam && selectedCategory && selectedPaper || selectedPart
                ? `ඔබ තෝරාගත්තේ: ${selectedExam} → ${selectedCategory} → ${selectedPaper.year} - ${selectedPaper.paper_title}${selectedPart ? ` (Part ${selectedPart})` : ''}`
                : 'කරුණාකර සියල්ල තෝරන්න'}
            </ThemedText>

            <CustomButton
              title="Next"
              style={{ marginTop: 40, marginBottom: 80 }}
              pressedStyle={{ backgroundColor: isDark ? '#333' : '#000' }}
              onPress={() => {
                if (selectedExam && selectedCategory && selectedPaper) {
                  let linkToSend = selectedPaper.link;

                  if (selectedPart && 'part' in selectedPaper) {
                    const matchingPart = (selectedYearPapers as Paper[]).find(
                      (p) => p.part?.toString() === selectedPart
                    );
                    if (matchingPart) {
                      linkToSend = matchingPart.link;
                    }
                  }

                  router.push({
                    pathname: '/paper',
                    params: {
                      exam: selectedExam,
                      category: selectedCategory,
                      paperTitle: selectedPaper.paper_title,
                      paperLink: linkToSend,
                      part: selectedPart,
                      year: selectedYear,
                    },
                  });
                } else {
                  Alert.alert(
                    'සැලකිය යුතුයි',
                    'කරුණාකර විභාගය, කාණ්ඩය, වර්ෂය සහ පත්‍රය තෝරන්න.'
                  );
                }
              }}
            />
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignSelf: 'flex-start',
  },
  leafIcon: { position: 'absolute', top: -20, right: -20, zIndex: 0 },
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: 'transparent' },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 42,
  },
  section: { marginTop: 80, backgroundColor: 'transparent' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginTop: 10,
  },
  dropdown: { height: 60 },
  selectedInfo: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
