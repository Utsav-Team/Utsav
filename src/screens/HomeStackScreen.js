import React from 'react'
import HomeScreen from './HomeScreen'

const HomeStack = createStackNavigator();
const HomeStackScreen = ({navigation}) => {
  return (
    // <HomeStack.Navigator>
    //   <HomeStack.Screen
    //     name="Profile"
    //     component={HomeScreen}
    //   />
    // </HomeStack.Navigator>
    <Text>Hello</Text>
  );
};



export default HomeStackScreen