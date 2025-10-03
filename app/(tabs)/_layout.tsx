
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Accueil',
    },
    {
      name: 'inventory',
      route: '/(tabs)/inventory',
      icon: 'cube.box.fill',
      label: 'Inventaire',
    },
    {
      name: 'sales',
      route: '/(tabs)/sales',
      icon: 'cart.fill',
      label: 'Ventes',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profil',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Accueil</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="inventory">
          <Icon sf="cube.box.fill" drawable="ic_inventory" />
          <Label>Inventaire</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="sales">
          <Icon sf="cart.fill" drawable="ic_sales" />
          <Label>Ventes</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profil</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none', // Remove fade animation to prevent black screen flash
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="inventory" />
        <Stack.Screen name="sales" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
