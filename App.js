import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import AuthenticationScreen from './src/screens/AuthenticationScreen';
import { MainTabNavigator } from './src/screens/MainTabNavigator';
import OnboardigScreen from './src/screens/OnboardigScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SpashScreen';

const App = () => {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="OnboardigScreen"
    //     screenOptions={{headerShown: false}}>
    //     <Stack.Screen name="OnboardigScreen" component={OnboardigScreen} />
    //     <Stack.Screen
    //       name="AuthenticationScreen"
    //       component={AuthenticationScreen}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabNavigator"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
