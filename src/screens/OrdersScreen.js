import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import moment from 'moment';
import Accordian from './Accordian';
import {ScrollView} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const OrdersScreen = () => {
  const orders = useSelector(state => state.orders);
  return (
    <>
      <Text style={styles.header}>ORDERS</Text>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <Accordian order={order} />
        ))}
      </ScrollView>
    </>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeded',
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 20,
    padding: 10,
    alignSelf: 'center',
  },
});
