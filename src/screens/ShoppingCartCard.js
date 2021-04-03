import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Agarbatti from '../assets/agarbatti.png';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

const ShoppingCartCard = ({item}) => {
  const products = useSelector((state) => state.products);
  const itemDetails = products.filter(product => product.id == item.id)[0];
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Agarbatti} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.itemDetails}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{itemDetails.name}</Text>
            <Text style={styles.itemCategory}>{itemDetails.category}</Text>
          </View>
          <Text style={styles.itemPrice}>${itemDetails.price}</Text>
        </View>
        <View style={styles.itemQuantityContainer}>
          <View style={styles.itemQuantity}>
            <Icon name="minuscircleo" color="#777777" size={30} />
            <Text style={styles.itemQuantityText}>{item.quantity}</Text>
            <Icon name="pluscircleo" color="#777777" size={30} />
          </View>
          <Text style={styles.itemRemove}>
            <Icon name="delete" color="red" size={30} />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShoppingCartCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: '#fff',
    height: 100,
    width: '100%',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 2,
    height: '80%',
    flex: 0.2,
    marginHorizontal: 5,
    overflow: 'hidden',
    borderRadius: 5,
  },
  detailsContainer: {
    height: '90%',
    flex: 0.8,
    marginHorizontal: 5,
    display: 'flex',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  itemDetails: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.6,
  },
  itemName: {
    fontSize: 20,
  },
  itemCategory: {
    fontSize: 12,
  },
  itemPrice: {
    fontSize: 18,
  },
  itemQuantityContainer: {
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemQuantity: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemQuantityText: {
    fontSize: 16,
  },
});
