import { StyleSheet, View, ImageBackground, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomButton from '@/components/custom/CustomButton';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { useState } from 'react';

export default function TravelDetailScreen() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');


    return (
        <LinearGradient colors={['#F7F4EF', '#FFEAC6']} style={{ flex: 1 }}>
            <ThemedView style={styles.container}>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Image with margins and radius */}
                    <View style={styles.imageWrapper}>
                        <ImageBackground
                            source={{ uri: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2' }}
                            style={styles.imageHeader}
                            imageStyle={styles.imageRounded}
                        >
                            {/* Blurred Back Button */}
                            <BlurView intensity={40} tint="light" style={styles.backBtnBlur}>
                                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                                    <Ionicons name="arrow-back" size={20} color="#000" />
                                </TouchableOpacity>
                            </BlurView>

                            {/* Blurred Details Overlay */}
                            <BlurView intensity={50} tint="dark" style={styles.overlay}>
                                <ThemedText style={styles.placeName}>Andes Mountain</ThemedText>
                                <ThemedText style={styles.placeLocation}>South America</ThemedText>
                                <ThemedText style={styles.placePrice}>$230</ThemedText>
                            </BlurView>
                        </ImageBackground>
                    </View>

                    {/* Details Card */}
                    <View style={styles.detailsCard}>
                        {/* Toggle Tabs */}
                        <View style={styles.tabContainer}>
                            <View style={styles.activeTab}>
                                <ThemedText style={styles.activeTabText}>Overview</ThemedText>
                            </View>
                            <TouchableOpacity style={styles.inactiveTab}>
                                <ThemedText style={styles.inactiveTabText}>Details</ThemedText>
                            </TouchableOpacity>
                        </View>

                        {/* Info Row */}
                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <Ionicons name="time-outline" size={18} color="#333" style={styles.icons} />
                                <ThemedText style={styles.infoLabel}>8 hours</ThemedText>
                            </View>
                            <View style={styles.infoItem}>
                                <Ionicons name="sunny-outline" size={18} color="#333" style={styles.icons}/>
                                <ThemedText style={styles.infoLabel}>16℃</ThemedText>
                            </View>
                            <View style={styles.infoItem}>
                                <Ionicons name="star" size={18} color="#333" style={styles.icons}/>
                                <ThemedText style={styles.infoLabel}>4.5</ThemedText>
                            </View>
                        </View>

                        {/* Description */}
                        <ThemedText style={styles.description}>
                            This vast mountain range is renowned for its remarkable diversity in terms of topography and climate. It features towering peaks, active volcanoes, deep canyons, expansive plateaus, and more.
                        </ThemedText>

                        {/* Book Button */}
                        <CustomButton
                            title="Book Now"
                            icon={<Ionicons name="rocket-outline" size={20} color="#fff" style={{ marginRight: 8 }} />}
                            style={styles.bookBtn}
                            pressedStyle={{ backgroundColor: '#000' }}
                            onPress={() => { }}
                        />
                    </View>

                </ScrollView>
            </ThemedView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    imageWrapper: {
        margin: 20,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    imageHeader: {
        height: 300,
        justifyContent: 'space-between',
        padding: 16,
    },
    imageRounded: {
        borderRadius: 24,
    },
    backBtnBlur: {
        borderRadius: 100,
        alignSelf: 'flex-start',
        overflow: 'hidden',
    },
    backBtn: {
        padding: 10,
    },
    overlay: {
        alignSelf: 'flex-start',
        backgroundColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.4)' : 'transparent',
        borderRadius: 16,
        padding: 12,
        width: '100%',
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
    detailsCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        marginTop: -10,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#444',
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        marginBottom: 20,
    },
    bookBtn: {
        marginTop: 24,
        backgroundColor: '#000',
        borderRadius: 12,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontWeight: '600'
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    activeTab: {
        backgroundColor: '#000',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
    },

    inactiveTab: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
    },

    activeTabText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },

    inactiveTabText: {
        color: '#555',
        fontWeight: '500',
        fontSize: 14,
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    infoLabel: {
        marginLeft: 6,
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    icons: {
        backgroundColor: '#dbdbdba8',
        padding: 10,
        borderRadius: 10,
    }
});
