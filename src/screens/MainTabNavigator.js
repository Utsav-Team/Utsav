import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{backgroundColor: '#841C8E'}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Details"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({color}) => (
            <Icon name="heart-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <Icon name="cart-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="face-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({navigation}) => {

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
          shadowColor: 'transparent', // iOS
          elevation: 0, // Android
        },
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor='transparent'
                color='blue'
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
