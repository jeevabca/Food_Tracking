import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../store/slices/cartSlice';
import {placeOrder} from '../store/slices/orderSlice';

const paymentMethods = [
  {key: 'cash', label: 'Cash', icon: require('../assets/coin.jpg')},
  {key: 'visa', label: 'Visa', icon: require('../assets/visa.jpg')},
  {
    key: 'mastercard',
    label: 'Mastercard',
    icon: require('../assets/master.jpg'),
  },
  {key: 'paypal', label: 'PayPal', icon: require('../assets/paypal.png')},
];

export default function CheckoutScreen({navigation}) {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.cart);

  const [selectedMethod, setSelectedMethod] = useState('mastercard');

  const handleMockPayment = () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty');
      return;
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newOrder = {
      items,
      total,
      createdAt: new Date().toISOString(),
    };

    dispatch(placeOrder(newOrder));
    dispatch(clearCart());

    Alert.alert('Payment Successful', 'Your order has been placed!', [
      {text: 'Track Order', onPress: () => navigation.replace('Track')},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Payment</Text>

      <View style={styles.methodRow}>
        {paymentMethods.map(method => (
          <TouchableOpacity
            key={method.key}
            onPress={() => setSelectedMethod(method.key)}
            style={[
              styles.methodBox,
              selectedMethod === method.key && styles.methodBoxSelected,
            ]}>
            <Image source={method.icon} style={styles.methodIcon} />
            <Text style={styles.methodLabel}>{method.label}</Text>
            {selectedMethod === method.key && (
              <Text style={styles.checkMark}>✔</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.cardInfoBox}>
        <Image
          source={require('../assets/master.jpg')}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>No master card added</Text>
        <Text style={styles.cardSubtitle}>
          You can add a mastercard and save it for later
        </Text>
        <TouchableOpacity style={styles.addNewBtn}>
          <Text style={styles.addNewText}>＋ ADD NEW</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginVertical: 10,
        }}>
        {items.map(item => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              key={item.id}
              style={{
                fontSize: 16,
                color: '#333',
                marginBottom: 4,
              }}>
              {item.name} × {item.quantity}
            </Text>
            <Text style={{fontSize: 18, color: '#333'}}>
              ₹ {item.price * item.quantity}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL:</Text>
        <Text style={styles.totalValue}>
          ₹ {items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </Text>
      </View>

      <TouchableOpacity style={styles.payBtn} onPress={handleMockPayment}>
        <Text style={styles.payText}>PAY & CONFIRM</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  methodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  methodBox: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    width: 70,
    height: 70,
    justifyContent: 'center',
    position: 'relative',
  },
  methodBoxSelected: {
    borderWidth: 2,
    borderColor: '#FF7A00',
  },
  methodIcon: {
    width: 32,
    height: 24,
    resizeMode: 'contain',
  },
  methodLabel: {
    fontSize: 10,
    marginTop: 4,
    color: '#333',
  },
  checkMark: {
    position: 'absolute',
    top: 4,
    right: 6,
    fontSize: 12,
    color: '#FF7A00',
  },
  cardInfoBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 120,
    height: 70,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  addNewBtn: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#FF7A00',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addNewText: {
    color: '#FF7A00',
    fontWeight: '600',
    fontSize: 13,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  totalLabel: {
    color: 'black',
    fontSize: 16,
  },
  totalValue: {
    color: '#111',
    fontSize: 20,
    fontWeight: '700',
  },
  payBtn: {
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemList: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  itemLine: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});
