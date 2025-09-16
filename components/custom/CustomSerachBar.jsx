import { TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';

export default function CustomSearchBar({ value, onChange }) {
  return (
    <ThemedView style={styles.container}>
      <Ionicons name="search" size={20} color="#6B7280" />
      <TextInput
        style={styles.input}
        placeholder="සෙවීම..."
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChange}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
});
