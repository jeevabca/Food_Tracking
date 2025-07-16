import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

import store from './src/store';
import {login, logout} from './src/store/slices/authSlice';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import MapScreen from './src/screens/MapScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderTrackingScreen from './src/screens/OrderTrackingScreen';
import MenuScreen from './src/screens/MenuScreen';
import SplashScreen from './src/screens/SplashScreen';

const HomeStackNav = createNativeStackNavigator();
function HomeStack() {
  return (
    <HomeStackNav.Navigator screenOptions={{headerShown: false}}>
      <HomeStackNav.Screen name="HomeMain" component={HomeScreen} />
      <HomeStackNav.Screen name="Menu" component={MenuScreen} />
      <HomeStackNav.Screen name="Cart" component={CartScreen} />
      <HomeStackNav.Screen name="Checkout" component={CheckoutScreen} />
      <HomeStackNav.Screen name="Track" component={OrderTrackingScreen} />
    </HomeStackNav.Navigator>
  );
}

// Create a CartStack that includes checkout
const CartStackNav = createNativeStackNavigator();
function CartStack() {
  return (
    <CartStackNav.Navigator screenOptions={{headerShown: false}}>
      <CartStackNav.Screen name="CartMain" component={CartScreen} />
      <CartStackNav.Screen name="Checkout" component={CheckoutScreen} />
    </CartStackNav.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Cart') iconName = 'cart-outline';
          else if (route.name === 'Map') iconName = 'map-outline';
          else if (route.name === 'Track') iconName = 'time-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Track" component={OrderTrackingScreen} />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

function AppNavigator() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        const {uid, email, displayName, photoURL} = currentUser;
        dispatch(login({uid, email, displayName, photoURL}));
      } else {
        dispatch(logout());
      }

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!user ? (
        <RootStack.Screen name="Login" component={LoginScreen} />
      ) : (
        <RootStack.Screen name="MainTabs" component={MainTabs} />
      )}
    </RootStack.Navigator>
  );
}

// ✅ Root App
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
