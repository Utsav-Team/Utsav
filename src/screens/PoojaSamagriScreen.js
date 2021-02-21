import React from 'react'
import { View, Text } from 'react-native'
import serviceListData from '../../data/Services';
import ServicesGrid from './ServicesGrid';

const PoojaSamagriScreen = () => {
    return (
        <View>
            <ServicesGrid serviceListData={serviceListData} />
        </View>
    )
}

export default PoojaSamagriScreen
