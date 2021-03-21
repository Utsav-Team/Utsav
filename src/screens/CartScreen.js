import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {addToCart} from '../redux/CartActions';

const CartScreen = () => {
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch()
    return (
        <View>
            <Text>This is the cart screen.</Text>
            {cartItems != null && cartItems.map(item => (<Text>{item.itemId}</Text>))}
            <Button onPress={() => dispatch(addToCart())} title="Click Here"/>
        </View>
    )
}

export default CartScreen
