import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getFlagSync } from '../lib/featureFlags';
import DealsSpotlightScreen from '../screens/DealsSpotlightScreen';
import DealDetailScreen from '../screens/DealDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SCREEN_OPTIONS = {
  headerStyle: { backgroundColor: '#0f172a' },
  headerTintColor: '#f1f5f9',
  headerTitleStyle: { fontWeight: '700' as const },
  headerShadowVisible: false,
};

export default function AppNavigator() {
  const showDeals = getFlagSync('showDealsSpotlight');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
    
            <Stack.Screen
              name="DealsSpotlight"
              component={DealsSpotlightScreen}
              options={{ title: 'Deals Spotlight' }}
            />
            <Stack.Screen
              name="DealDetail"
              component={DealDetailScreen}
              options={{ title: '' }}
            />
   
      </Stack.Navigator>
    </NavigationContainer>
  );
}