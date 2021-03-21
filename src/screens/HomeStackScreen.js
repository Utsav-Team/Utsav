import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import HomeScreen from './HomeScreen';
import PoojaSamagriScreen from './PoojaSamagriScreen';

const HomeStack = createStackNavigator();
const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Pooja Samagri"
        component={PoojaSamagriScreen}
        options={{headerStyle: {shadowColor: 'transparent', elevation: 0}}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
