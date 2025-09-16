import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          height: 70,
          backgroundColor: isDark ? "#111827" : "#ffffff",
          borderRadius: 20,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: isDark ? 0.4 : 0.08,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 10,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#FF9500",
        tabBarInactiveTintColor: isDark ? "#ffffffff" : "#10100fff",
        tabBarButton: (props) => (
          <TouchableOpacity
            activeOpacity={0.8}
            {...Object.fromEntries(
              Object.entries(props).filter(([_, v]) => v !== null)
            )}
          />
        ),
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabItem}>
              <View
                style={[
                  styles.iconContainer,
                  focused && {
                    backgroundColor: isDark ? "#333300" : "#FFF3E0",
                  },
                ]}
              >
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={26}
                  color={color}
                />
              </View>
              <Text style={[styles.label, { color }]}>Home</Text>
            </View>
          ),
        }}
      />

      {/* Papers Tab */}
      <Tabs.Screen
        name="paper"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabItem}>
              <View
                style={[
                  styles.iconContainer,
                  focused && {
                    backgroundColor: isDark ? "#332200" : "#FFF3E0",
                  },
                ]}
              >
                <Ionicons
                  name={focused ? "book" : "book-outline"}
                  size={26}
                  color={color}
                />
              </View>
              <Text style={[styles.label, { color }]}>Papers</Text>
            </View>
          ),
        }}
      />

      {/* Downloads Tab */}
      <Tabs.Screen
        name="list"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabItem}>
              <View
                style={[
                  styles.iconContainer,
                  focused && {
                    backgroundColor: isDark ? "#332200" : "#FFF3E0",
                  },
                ]}
              >
                <Ionicons
                  name={focused ? "download" : "download-outline"}
                  size={26}
                  color={color}
                />
              </View>
              <Text style={[styles.label, { color }]}>Downloads</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  iconContainer: {
    width: 70,
    height: 34,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    position: "absolute",
    top: 40, 
    textAlign: "center",
    width: "100%",
  },
});
