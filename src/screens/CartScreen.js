import React from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/CartActions';
import {getTotalCartItems} from '../redux/CartReducer';
import ShoppingCartCard from './ShoppingCartCard';

const CartScreen = () => {
  const {totalPrice, totalItems} = getTotalCartItems();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Shopping Cart</Text>
        <Text style={styles.total}>
          Sub Total ({totalItems} items) : ${totalPrice}
        </Text>
      </View>
      <ScrollView
        style={styles.cartContainer}
        showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <ShoppingCartCard item={item} />
        ))}
      </ScrollView>
      <Text style={styles.purchaseButton}>Proceed to buy</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#eaeded',
  },
  headerContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    paddingBottom: 5,
  },
  total: {
    fontSize: 16,
    paddingBottom: 10,
  },
  cartContainer: {
    //   minHeight: '50%',
  },
  purchaseButton: {
    backgroundColor: '#ffd814',
    textAlign: 'center',
    fontSize: 30,
    paddingVertical: 8,
  },
});
