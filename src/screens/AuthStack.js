import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OnboardigScreen from './OnboardigScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';


function AuthStack({route}) {
  const Stack = createStackNavigator();
  const isFirstTimeLoaded = route.params.isFirstTimeLoaded;
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      {!isFirstTimeLoaded && (
        <Stack.Screen name="OnboardigScreen" component={OnboardigScreen} />
      )}
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
