import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screen/SplashScreen';
import HomeScreen from '../screen/HomeScreen';
import BottomBar from './BottomBar';
import SearchScreen from '../screen/SearchScreen';
import ImageScreen from '../screen/ImageScreen';

const Stack = createNativeStackNavigator();

const SplashScreenComponent = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 0.000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return <SplashScreen />;
};

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />
      <Stack.Screen name="Main" component={BottomBar} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ImageScreen" component={ImageScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
