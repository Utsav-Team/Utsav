import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Grid from 'react-native-grid-component';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartActions';

export default function PoojaItemsGrid({poojaItems, navigation}) {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch()
  let _renderItem = (data, i) => (
    <View style={styles.item} key={i}>
      <Text style={styles.imageHeader}>{data.name}</Text>
      <Image style={styles.image} source={data.image} />
      {data.quantity > 0 ? (
        <View style={styles.priceBox}>
          <Text style={styles.price}>${data.price}</Text>
          <TouchableOpacity style={styles.addToCart} onPress={() => dispatch(addToCart(data.id))} >
            <Text>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.priceBox}>
          <View style={styles.addToCart}>
            <Text>Sold Out</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Grid
        style={styles.list}
        renderItem={_renderItem}
        data={poojaItems}
        numColumns={2}
        keyExtractors={(item, index) => 'Hello' + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  item: {
    flex: 1,
    padding: 5,
    height: 240,
    margin: 5,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 10,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
  imageHeader: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 4,
  },
  imageContainer: {
    backgroundColor: 'red',
    width: '100%',
    height: 125,
  },
  image: {
    width: '100%',
    height: 125,
  },
  addToCart: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: '#ccc',
    margin: 2,
    borderRadius: 5,
  },
  price: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
  },
  priceBox: {
    backgroundColor: 'red',
  },
});
