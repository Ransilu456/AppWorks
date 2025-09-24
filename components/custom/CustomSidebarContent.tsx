import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, View, useColorScheme } from 'react-native';
import React from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

export default function SidebarContent(props: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('@/assets/logo.png')} style={styles.logo} />
      </View>

      {/* Drawer items */}
      <DrawerItemList
        {...props}
        inactiveTintColor={isDark ? '#9CA3AF' : '#555'} 
        activeTintColor={isDark ? '#FFD479' : '#F4B400'} 
      />

      {/* Separator */}
      <ThemedView
        style={[
          styles.separator,
          { backgroundColor: isDark ? '#222' : '#c2c2c2' },
        ]}
      />

      {/* Footer */}
      <ThemedView
        style={{
          padding: 16,
          backgroundColor: 'transparent',
          alignItems: 'center',
        }}
      >
        <ThemedText
          style={[
            styles.footertitle,
            { color: isDark ? '#aaa' : '#6B7280' },
          ]}
        >
          © {new Date().getFullYear()} E - Marketing Paradice Design Lab. All rights reserved.
        </ThemedText>
        <ThemedText
          style={[
            styles.footertitle,
            { color: isDark ? '#aaa' : '#6B7280' },
          ]}
        >
          Version 1.0.0
        </ThemedText>
        <ThemedText
          style={[
            styles.description,
            { color: isDark ? '#777' : '#6B7280' },
          ]}
        >
          ශ්‍රී ශාසනාලංකාර මහා විහාරය
          කුලියාපිටිය.
        </ThemedText>
      </ThemedView>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, alignItems: 'center' },
  logo: { width: 80, height: 80, resizeMode: 'contain' },
  footertitle: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 0,
    lineHeight: 20,
  },
  separator: {
    height: 1,
    marginVertical: 6,
    marginTop: 330,
    marginBottom: 0,
  },
  description: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 14,
    fontStyle: 'italic',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
