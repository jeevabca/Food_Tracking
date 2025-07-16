import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {getAuth} from '@react-native-firebase/auth';
import {logout} from '../store/slices/authSlice';

const restaurants = [
  {
    id: '1',
    name: 'Rose Garden Restaurant',
    image: require('../assets/rest_1.png'),
    categories: 'Burger - Chicken - Rice - Wings',
    rating: 4.7,
    delivery: 'Free',
    time: '20 min',
    menu: [
      {
        id: 'm1',
        name: 'Burger Ferguson',
        image:
          'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_640.jpg',
        price: 40,
      },
      {
        id: 'm2',
        name: "Rockin' Burgers",
        image:
          'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_640.jpg',
        price: 40,
      },
    ],
  },
  {
    id: '2',
    name: 'Green Bowl',
    image: require('../assets/rest_2.png'),
    categories: 'Healthy - Vegan - Salad',
    rating: 4.3,
    delivery: 'Free',
    time: '15 min',
    menu: [
      {
        id: 'm3',
        name: 'Avocado Salad',
        image:
          'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_640.jpg',
        price: 30,
      },
      {
        id: 'm4',
        name: 'Chickpea Bowl',
        image:
          'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_640.jpg',
        price: 35,
      },
    ],
  },
];

const categories = [
  {id: '1', label: 'All', icon: 'grid-outline', active: true},
  {id: '2', label: 'Hot Dog', icon: 'fast-food-outline', active: false},
  {id: '3', label: 'Burger', icon: 'restaurant-outline', active: false},
  {id: '4', label: 'Pizza', icon: 'pizza-outline', active: false},
  {id: '5', label: 'Drinks', icon: 'wine-outline', active: false},
];

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await getAuth().signOut();
    dispatch(logout());
  };

  const renderCategoryButton = (item, index) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.categoryButton,
        item.active && styles.categoryButtonActive,
        index === 0,
      ]}>
      <View style={styles.categoryIconContainer}>
        <Icon
          name={item.icon}
          size={22}
          color={item.active ? '#FF5722' : '#666'}
        />
      </View>
      <Text
        style={[
          styles.categoryButtonText,
          item.active && styles.categoryButtonTextActive,
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
  const renderRestaurant = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Menu', {restaurant: item})}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>{item.categories}</Text>
      <View style={styles.cardInfoRow}>
        <Text style={styles.cardInfo}>⭐ {item.rating.toFixed(1)}</Text>
        <Text style={styles.cardInfo}>🚚 {item.delivery}</Text>
        <Text style={styles.cardInfo}>⏱ {item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.header}>
          <View>
            <Text style={styles.deliverTo}>DELIVER TO</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>Halal Lab office</Text>
              <Icon name="chevron-down" size={18} color="#000" />
            </View>
          </View>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'red',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={handleLogout}>
            <Text style={{textAlign: 'center', color: 'white'}}>LogOut</Text>
          </TouchableOpacity>
          {/* <View style={styles.cartIconWrapper}> */}
          {/* <Icon name="cart-outline" size={28} color="#000" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View> */}
          {/* </View> */}
        </View>

        <Text style={styles.greeting}>
          Hey Halal, <Text style={{fontWeight: 'bold'}}>Good Afternoon!</Text>
        </Text>

        <View style={styles.searchBox}>
          <Icon
            name="search-outline"
            size={18}
            color="#999"
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Search dishes, restaurants"
            placeholderTextColor="#999"
            style={{flex: 1}}
          />
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          style={{marginTop: 20}}>
          {categories.map((item, index) => renderCategoryButton(item, index))}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <Text style={styles.sectionTitle}>Open Restaurants</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  deliverTo: {
    fontSize: 12,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    marginRight: 4,
    color: '#000',
  },
  cartIconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 16,
    marginVertical: 16,
    color: '#000',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
  },
  seeAll: {
    color: '#FF5722',
    fontSize: 14,
  },

  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImage: {
    height: 180,
    width: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 12,
    color: '#000',
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 30,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    minWidth: 100,
    justifyContent: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#FFE5D9',
    borderColor: '#FF5722',
    shadowColor: '#FF5722',
    shadowOpacity: 0.2,
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FF5722',
    fontWeight: '600',
  },
  categoryButtonAlt: {
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    minWidth: 80,
  },
  categoryIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIconCircleActive: {
    backgroundColor: '#FF5722',
    shadowColor: '#FF5722',
    shadowOpacity: 0.3,
  },
  categoryButtonTextAlt: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryButtonTextAltActive: {
    color: '#FF5722',
    fontWeight: '600',
  },
});
