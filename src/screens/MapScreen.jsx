import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  StatusBar,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const restaurants = [
  {
    id: '1',
    name: 'Pizza Palace',
    location: {latitude: 12.9716, longitude: 77.5946},
  },
  {
    id: '2',
    name: 'Burger House',
    location: {latitude: 12.2958, longitude: 76.6394},
  },
];

export default function MapScreen() {
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    };
    requestLocationPermission();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      <View style={{flex: 1}}>
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
          {/* {restaurants.map(res => (
            <Marker key={res.id} coordinate={res.location} title={res.name} />
          ))} */}
        </MapView>
      </View>
    </SafeAreaView>
  );
}
