import React from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const isFirstTimeLoadedVal = async (navigation) => {
    try {
      const isFirstTimeLoaded = JSON.parse(await AsyncStorage.getItem('isFirstTimeLoaded'));
      if (isFirstTimeLoaded === null) {
        await AsyncStorage.setItem('isFirstTimeLoaded', JSON.stringify(true));
        navigation.navigate('AuthScreen', {isFirstTimeLoaded: false});
      }
      navigation.navigate('AuthScreen', {isFirstTimeLoaded: true});
    } catch (err) {
      console.log('ERROR >>> ', err);
    }
  };

export default function AppLoadingScreen({navigation}) {
    isFirstTimeLoadedVal(navigation);
    return (
        <View>
            <Text>App Loading Screen</Text>
        </View>
    )
}
