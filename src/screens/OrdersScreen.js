import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Orders from '../../data/Orders';
import moment from 'moment';

const OrdersScreen = () => {
  let _renderItem = ({item}) => {
    return (
      <View style={styles.orderItem}>
        <View style={styles.orderId}>
          <Text>Order Id : {item.Id}</Text>
          <Text>Total : {item.total}</Text>
        </View>
        <Text>{moment(item.time).calendar()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Orders}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141067',
  },
  orderItem: {
    backgroundColor: '#ddd',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 5,
  },
  orderId: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
