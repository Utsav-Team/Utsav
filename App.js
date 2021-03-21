import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppLoadingScreen from './src/screens/AppLoadingScreen';
import AuthStack from './src/screens/AuthStack';
import {MainTabNavigator} from './src/screens/MainTabNavigator';

const App = () => {
  console.log(store);
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="MainTabNavigator">
          <Stack.Screen name="AppLoading" component={AppLoadingScreen} />
          <Stack.Screen name="AuthScreen" component={AuthStack} />
          <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
