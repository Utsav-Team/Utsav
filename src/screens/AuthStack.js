import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OnboardingScreen from './OnboardingScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';


function AuthStack({route}) {
  const Stack = createStackNavigator();
  const isFirstTimeLoaded = route.params.isFirstTimeLoaded;
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}>
      {!isFirstTimeLoaded && (
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      )}
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
