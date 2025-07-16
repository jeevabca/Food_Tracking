import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
// import {COLOR} from '../utils/constant';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <Image
          source={require('../assets/Logo.png')}
          style={{height: '10%', width: '90%'}}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
