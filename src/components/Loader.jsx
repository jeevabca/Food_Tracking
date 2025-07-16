// src/components/Loader.jsx
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export default function Loader({size = 'large', color = '#2196f3'}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
