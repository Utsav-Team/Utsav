import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Carousel from '../../components/Carousal'
import { dummyData } from '../../data/Data'
import serviceListData from '../../data/Services'
import ServicesGrid from './ServicesGrid'

const HomeScreen = ({navigation}) =>{
    return (
        <ScrollView>
            <Carousel data = {dummyData}/>
            <ServicesGrid serviceListData={serviceListData} navigation={navigation}/>
        </ScrollView>
    )
}

export default HomeScreen