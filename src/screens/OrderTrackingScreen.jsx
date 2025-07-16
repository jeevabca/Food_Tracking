import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import {updateOrderStatus} from '../store/slices/orderSlice';
const {height} = Dimensions.get('window');
const statuses = ['placed', 'preparing', 'on_the_way', 'delivered'];

export default function OrderTrackingScreen() {
  const dispatch = useDispatch();
  const {currentOrder, status} = useSelector(state => state.order);
  const [index, setIndex] = useState(statuses.indexOf(status));

  const [driverPosition, setDriverPosition] = useState({
    latitude: 37.773972,
    longitude: -122.431297,
  });

  const destination = {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  const markerRef = useRef(null);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => {
        const next = prev + 1;
        if (next < statuses.length) {
          dispatch(updateOrderStatus(statuses[next]));
          return next;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animate marker movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPosition(prev => {
        const newLat = prev.latitude + 0.0001;
        const newLng = prev.longitude + 0.0001;
        return {latitude: newLat, longitude: newLng};
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const {items = [], total = 0} = currentOrder || {};

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        <Marker
          ref={markerRef}
          coordinate={driverPosition}
          title="Delivery Guy"
          description="On the way"
          pinColor="orange"
        />
        <Marker
          coordinate={destination}
          title="Your Location"
          pinColor="green"
        />
        <Polyline
          coordinates={[driverPosition, destination]}
          strokeColor="#FF6A00"
          strokeWidth={3}
        />
      </MapView>

      {/* Bottom Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.storeName}>Uttora Coffee House</Text>
        <Text style={styles.timestamp}>
          Ordered at: {new Date(currentOrder?.createdAt).toLocaleString()}
        </Text>
        {items.map(item => (
          <Text key={item.id} style={styles.itemText}>
            {item.quantity}x {item.name}
          </Text>
        ))}
        <Text style={styles.total}>Total: ₹{total}</Text>
        <Text style={styles.status}>Status: {status.replace(/_/g, ' ')}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginVertical: 4,
  },
  itemText: {
    fontSize: 14,
    marginVertical: 2,
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    color: '#FF7A00',
    fontWeight: 'bold',
  },
});
