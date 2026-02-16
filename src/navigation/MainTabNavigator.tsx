import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Compass, Target, MessageCircle, User } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../constants/colors';
import { fonts, fontSizes } from '../constants/typography';
import { isIOS } from '../utils/platform';
import type { MainTabParamList } from '../types/navigation';

// Screens
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { LifeMapScreen } from '../screens/life-map/LifeMapScreen';
import { MissionsScreen } from '../screens/missions/MissionsScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconColor = isFocused ? colors.copper.DEFAULT : colors.text.tertiary;
          const iconSize = 22;

          let icon;
          switch (route.name) {
            case 'Inicio':
              icon = <Home size={iconSize} color={iconColor} />;
              break;
            case 'Mapa':
              icon = <Compass size={iconSize} color={iconColor} />;
              break;
            case 'Missoes':
              icon = <Target size={iconSize} color={iconColor} />;
              break;
            case 'Chat':
              icon = <MessageCircle size={iconSize} color={iconColor} />;
              break;
            case 'Perfil':
              icon = <User size={iconSize} color={iconColor} />;
              break;
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={[styles.tabIconContainer, isFocused && styles.tabIconActive]}>
                {icon}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isFocused ? colors.copper.DEFAULT : colors.text.tertiary },
                ]}
              >
                {label}
              </Text>
              {isFocused && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Inicio" component={DashboardScreen} />
      <Tab.Screen name="Mapa" component={LifeMapScreen} />
      <Tab.Screen name="Missoes" component={MissionsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Perfil" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: isIOS ? 28 : 12,
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(245,240,232,0.92)',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.glass.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  tabIconContainer: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  tabIconActive: {
    backgroundColor: 'rgba(196,149,106,0.12)',
  },
  tabLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.xs,
    marginTop: 2,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.copper.DEFAULT,
  },
});
