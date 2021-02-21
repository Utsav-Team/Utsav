import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Grid from 'react-native-grid-component';
import * as Animatable from 'react-native-animatable';

export default function ServicesGrid({serviceListData}) {
  let _renderItem = (data, i) => (
    <TouchableOpacity style={styles.item} key={i} disabled={!data.active} onPress={console.log('Clicked')}>
      <Text style={styles.imageHeader}>{data.header}</Text>
      <Image style={styles.image} source={data.image} blurRadius={data.active? 0 : 2} />
      { !data.active && <Animatable.View animation="pulse" iterationCount="infinite" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>Coming Soon</Text>
      </Animatable.View>
      }
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Grid
        style={styles.list}
        renderItem={_renderItem}
        // renderPlaceholder={_renderItem}
        data={serviceListData}
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
});
