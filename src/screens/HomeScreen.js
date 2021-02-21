import React from 'react'
import {View, Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Carousel from '../../components/Carousal'
import { dummyData } from '../../data/Data'
import HomeServicesScreen from './HomeServicesScreen'


const HomeScreen = ({navigation}) =>{
    return (
        <ScrollView>
            <Carousel data = {dummyData}/>
            <HomeServicesScreen />
        </ScrollView>
    )
}

export default HomeScreen