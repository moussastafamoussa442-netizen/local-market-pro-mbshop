
import { BlurView } from 'expo-blur';
import { useTheme } from '@react-navigation/native';
import { useRouter, usePathname } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: colors.card,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    color: colors.text,
  },
  activeTabLabel: {
    color: colors.card,
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
});

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 25,
  bottomMargin = 16,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  
  const indicatorPosition = useSharedValue(0);
  const tabWidth = containerWidth / tabs.length;

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
      width: tabWidth,
    };
  });

  const handleTabPress = (route: string) => {
    console.log('Tab pressed:', route);
    const tabIndex = tabs.findIndex(tab => tab.route === route);
    if (tabIndex !== -1) {
      indicatorPosition.value = withSpring(tabIndex * tabWidth, {
        damping: 20,
        stiffness: 300,
      });
    }
    router.push(route as any);
  };

  // Update indicator position when pathname changes
  React.useEffect(() => {
    const currentTabIndex = tabs.findIndex(tab => {
      if (tab.route === '/(tabs)/(home)/') {
        return pathname.startsWith('/(tabs)/(home)') || pathname === '/';
      }
      return pathname.startsWith(tab.route);
    });
    
    if (currentTabIndex !== -1) {
      indicatorPosition.value = withSpring(currentTabIndex * tabWidth, {
        damping: 20,
        stiffness: 300,
      });
    }
  }, [pathname, tabs, tabWidth]);

  const isTabActive = (route: string) => {
    if (route === '/(tabs)/(home)/') {
      return pathname.startsWith('/(tabs)/(home)') || pathname === '/';
    }
    return pathname.startsWith(route);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={[styles.tabBar, { width: containerWidth, alignSelf: 'center' }]}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={80} style={StyleSheet.absoluteFill} />
        ) : null}
        
        <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
        
        {tabs.map((tab) => {
          const isActive = isTabActive(tab.route);
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => handleTabPress(tab.route)}
              activeOpacity={0.7}
            >
              <IconSymbol
                name={tab.icon as any}
                size={24}
                color={isActive ? colors.card : colors.text}
              />
              <Text style={[
                styles.tabLabel,
                isActive && styles.activeTabLabel
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
