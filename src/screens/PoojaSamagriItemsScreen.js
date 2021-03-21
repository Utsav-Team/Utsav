import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import poojaItems from '../../data/PoojaItems'
import PoojaItemsGrid from './PoojaItemsGrid'

const PoojaSamagriItemsScreen = ({navigation}) => {
    return (
        <ScrollView>
            <PoojaItemsGrid navigation={navigation} poojaItems={poojaItems} />
        </ScrollView>
    )
}

export default PoojaSamagriItemsScreen;
