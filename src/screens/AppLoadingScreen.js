import React from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isFirstTimeAlreadyLoaded = async (navigation) => {
  AsyncStorage.getItem('isFirstTimeLoaded')
    .then((val) => {
      const isFirstTimeLoaded = JSON.parse(val);
      if (isFirstTimeLoaded === null) {
        AsyncStorage.setItem('isFirstTimeLoaded', JSON.stringify(false));
        navigation.navigate('AuthScreen', {isFirstTimeLoaded: true});
      } else {
        navigation.navigate('AuthScreen', {isFirstTimeLoaded: false});
      }
    })
    .catch((err) => {
      console.log(
        'Error while loading isFirstTimeLoaded from Async Storage >>> ',
        err,
      );
    });
};

export default function AppLoadingScreen({navigation}) {
  isFirstTimeAlreadyLoaded(navigation);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>App Loading Screen</Text>
    </View>
  );
}
