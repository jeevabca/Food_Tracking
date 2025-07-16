import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeItem,
  updateQuantity,
  selectCartTotal,
} from '../store/slices/cartSlice';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CartScreen({navigation}) {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = useSelector(selectCartTotal);

  const handleRemove = id => {
    dispatch(removeItem(id));
  };

  const handleIncrease = item => {
    dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1}));
  };

  const handleDecrease = item => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1}));
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemCard}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={{flex: 1, marginLeft: 12}}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemSize}>14″</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() => handleDecrease(item)}
            style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyCount}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncrease(item)}
            style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Text style={styles.removeBtn}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cart</Text>

        <TouchableOpacity>
          <Text style={styles.doneText}>DONE</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty</Text>
        }
        contentContainerStyle={{paddingBottom: 20}}
      />

      {/* Bottom Section */}
      <View style={styles.checkoutContainer}>
        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.addressText}>
              2118 Thornridge Cir. Syracuse
            </Text>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalPrice}>₹ {total}</Text>
          <TouchableOpacity>
            <Text style={styles.breakdownText}>Breakdown ➤</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121022',
    paddingHorizontal: 16,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // paddingTop:
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#121022',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  doneText: {
    color: '#00c788',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1c33',
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  itemSize: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyButton: {
    backgroundColor: '#2c2842',
    borderRadius: 20,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  qtyCount: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 12,
  },
  removeBtn: {
    fontSize: 20,
    color: '#FF4C4C',
    paddingHorizontal: 8,
  },
  checkoutContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  addressSection: {
    marginBottom: 12,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  addressLabel: {
    color: '#bbb',
    fontSize: 12,
  },
  editText: {
    color: '#FF8800',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addressBox: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
  },
  addressText: {
    color: '#333',
    fontSize: 14,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#aaa',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  breakdownText: {
    color: '#FF8800',
    fontSize: 14,
    fontWeight: '600',
  },
  placeOrderButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
