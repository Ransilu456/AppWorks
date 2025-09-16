import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Pressable, StyleSheet, View, Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function AboutScreen() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <LinearGradient
            colors={isDark ? ['#000000ff', '#0c1117ff'] : ['#F7F4EF', '#ffeac6ff']}
            style={{ flex: 1 }}
        >
            {/* Header */}
            <ThemedView style={styles.header}>
                <ThemedView style={styles.menuBar}>
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
                </ThemedView>
                <ThemedText style={[styles.headerTitle, { color: isDark ? '#f3f4f6' : '#000' }]}>
                    මෙම යෙදුම පිළිබඳව
                </ThemedText>
                <View style={{ width: 24 }} />
            </ThemedView>

            {/* Content Card */}
            <ThemedView
                style={[
                    styles.card,
                    { backgroundColor: isDark ? '#070a13ff' : 'rgba(255, 255, 255, 0.9)' },
                ]}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ThemedText
                        style={[styles.cardTitle, { color: isDark ? '#f9fafb' : '#333' }]}
                    >
                        DP Education E - Marketing Paradise
                    </ThemedText>

                    <Image
                        source={require('@/assets/Our_Logo.png')}
                        style={styles.cardImage}
                        resizeMode="contain"
                    />

                    <ThemedText
                        style={[styles.cardText, { color: isDark ? '#d1d5db' : '#555' }]}
                    >
                        මෙම යෙදුම ශ්‍රී ලංකා රාමඤ්ඤය මහා නිකාය මඟින් පවත්වන ශ්‍රී ලංකා
                        ත්‍රිපිටක විභාගයට පෙනී සිටින සියලු දෙනාට අවශ්‍ය පසුගිය ප්‍රශ්න
                        පත්‍ර ලබා දීම සිදු කරයි.
                    </ThemedText>
                </View>

                <View style={styles.bottomContainer}>
                    <ThemedText style={[styles.version, { color: isDark ? '#9CA3AF' : '#888' }]}>
                        Version: 1.0.0
                    </ThemedText>
                    <ThemedText style={[styles.footer, { color: isDark ? '#6B7280' : '#AAA' }]}>
                        © 2025 DP Education.
                    </ThemedText>
                </View>
            </ThemedView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerTitle: { fontSize: 20, fontWeight: '700' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    menuBar: {
        paddingTop: 0,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    card: {
        flex: 1,
        margin: 16,
        padding: 20,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 40,
        marginTop: -60,
    },
    cardImage: {
        width: 350,
        height: 250,
        marginBottom: 16,
        borderRadius: 12,
    },
    cardText: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 20,
    },
    bottomContainer: {
        alignItems: 'center',
        marginBottom: 0,
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
