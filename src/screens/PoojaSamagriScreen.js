import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PoojaSamagriItemsScreen from './PoojaSamagriItemsScreen';
import PoojaSamagriPackagesScreen from './PoojaSamagriPackagesScreen';

const PoojaSamagriScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="PoojaSamagriItemsScreen" component={PoojaSamagriItemsScreen} name="Items" />
      <Tab.Screen name="PoojaSamagriPackagesScreen" component={PoojaSamagriPackagesScreen} name="Packages" />
    </Tab.Navigator>
  );
};

export default PoojaSamagriScreen;
