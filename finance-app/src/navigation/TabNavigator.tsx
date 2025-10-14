import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';
import { RootTabParamList } from '../types/navigation';

import MoedasScreen from '../screens/Moedas/MoedasScreen';
import AcoesScreen from '../screens/Acoes/AcoesScreen';
import CriptomoedasScreen from '../screens/Criptomoedas/CriptomoedasScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Moedas') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Acoes') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Criptomoedas') {
            iconName = focused ? 'logo-bitcoin' : 'logo-bitcoin';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Moedas" 
        component={MoedasScreen}
        options={{
          tabBarLabel: 'Moedas',
        }}
      />
      <Tab.Screen 
        name="Acoes" 
        component={AcoesScreen}
        options={{
          tabBarLabel: 'Ações',
        }}
      />
      <Tab.Screen 
        name="Criptomoedas" 
        component={CriptomoedasScreen}
        options={{
          tabBarLabel: 'Cripto',
        }}
      />
    </Tab.Navigator>
  );
};