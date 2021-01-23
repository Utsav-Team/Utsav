import React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardigScreen({navigation}) {
  return (
    <Onboarding
      onSkip={() => navigation.navigate('AuthenticationScreen')}
      onDone={() => navigation.navigate('AuthenticationScreen')}
      titleStyles={{fontFamily: 'Open Sans', fontStyle: 'normal' ,fontWeight: '700', fontSize: 22, lineHeight: 25, textAlign: 'center', color: '#000'}}
      subTitleStyles={{fontFamily: 'Open Sans', fontStyle: 'normal' ,fontWeight: 'normal', fontSize: 16, lineHeight: 20, textAlign: 'center', color: '#6B6B6B'}}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/onboarding-img1.png')} />,
          title: 'SELECT SERVICE',
          subtitle: 'Book for pooja samgari, decoration and anything for celebrations without going out.',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/onboarding-img2.png')} />,
          title: 'BOOK, ORDER AND DELIVERY',
          subtitle: 'Select the date, time and pay for the serivce. Our supervisor with be there for set up.',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/onboarding-img3.png')} />,
          title: 'CELEBRATE THE UTSAV',
          subtitle: 'Just enjoy the celebration without bothering about the arrangements. We are there for you.',
        },
      ]}
    />
  );
}
