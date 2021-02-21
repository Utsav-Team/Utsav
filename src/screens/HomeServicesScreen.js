import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Grid from 'react-native-grid-component';
import servicesData from '../../data/Services'

export default function HomeServicesScreen() {
  let _renderItem = (data, i) => (
    <TouchableOpacity style={[{backgroundColor: '#eee'}, styles.item]} key={i}>
      <Text style={styles.imageHeader}>{data.serviceHeader}</Text>
      {/* <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/onboarding-img2.png')}
        />
      </View> */}
      <Image
          style={styles.image}
          source={require('../assets/pooja_samagri.png')}
        />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Grid
        style={styles.list}
        renderItem={_renderItem}
        // renderPlaceholder={_renderItem}
        data={servicesData}
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
    height: 160,
    margin: 5,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 10,
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
});
