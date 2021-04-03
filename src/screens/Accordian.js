import moment from 'moment';
import React, {useRef, useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Accordian = ({order}) => {
  let accordian = useRef();
  const [expanded, setExpanded] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  let renderOrder = (order) => {
    return (
      <View style={[styles.title, styles.orderItem]}>
        <View>
          <Text style={styles.orderId}>Order Id : {order.Id}</Text>
          <Text style={styles.time}>{moment(order.time).calendar()}</Text>
        </View>
        <Text style={styles.orderTotal}>Total: ${order.total}</Text>
      </View>
    );
  };

  let renderOrderItem = (item) => {
    return (
      <View style={styles.itemDetailsContainer}>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemHeader}>{item.name}</Text>
          <Text style={styles.itemSubHeader}>{item.category}</Text>
        </View>
        <View style={styles.itemQuantityContainer} >
          <Text style={styles.itemHeader}>Price: ${item.price}</Text>
          <Text style={styles.itemSubHeader}>Quantity: {item.quantity}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        ref={accordian}
        style={styles.row}
        onPress={() => toggleExpand()}>
        {renderOrder(order)}
        <Icon
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={30}
          color="red"
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          {order.items && order.items.map((item) => renderOrderItem(item))}
        </View>
      )}
    </View>
  );
};

export default Accordian;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#aaa',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  parentHr: {
    height: 1,
    color: '#fff',
    width: '100%',
  },
  child: {
    backgroundColor: '#fff',
    padding: 16,
  },
  orderItem: {
    flex: 0.95,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderId: {
    marginBottom: 5,
    fontSize: 16,
  },
  orderTotal: {
    fontSize: 16,
  },
  time: {
    fontSize: 12,
  },
  itemDetailsContainer : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemHeader : {
    fontSize: 20,
    marginBottom: 2
  },
  itemSUbHeader: {
    fontSize: 12
  }
});
