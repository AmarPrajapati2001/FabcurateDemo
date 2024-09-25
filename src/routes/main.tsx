import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION, navigationRef } from '../constants/navigation';
import SplashScreen from '../screens/splashScreen';
import BottomTabNavigator from './bottomTabNavigator';

const Main = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={NAVIGATION.SPLASH}
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
      >
        <Stack.Screen name={NAVIGATION.SPLASH} component={SplashScreen} />
        <Stack.Screen name={NAVIGATION.BOTTOMTABNAVIGATOR} component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
