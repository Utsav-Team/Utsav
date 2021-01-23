import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthenticationScreen from './src/screens/AuthenticationScreen';
import Home from './src/screens/Home';
import OnboardigScreen from './src/screens/OnboardigScreen';

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
    <Home />
  );
};

export default App;
