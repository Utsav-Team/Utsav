import React from 'react'
import {View, Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Carousel from '../../components/Carousal'
import { dummyData } from '../../data/Data'
import ServicesGrid from './ServicesGrid'
import serviceListData from '../../data/Services'


const HomeScreen = ({navigation}) =>{
    return (
        <ScrollView>
            <Carousel data = {dummyData}/>
            <ServicesGrid serviceListData={serviceListData}/>
        </ScrollView>
    )
}

export default HomeScreen