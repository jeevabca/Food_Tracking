import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addItem} from '../store/slices/cartSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function MenuScreen({route, navigation}) {
  const {restaurant} = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = item => {
    dispatch(addItem(item));
    // Alert.alert('Added', `${item.name} added to cart`);
    navigation.navigate('Cart');
  };

  const renderItem = ({item}) => (
    <View style={styles.menuCard}>
      <Image source={{uri: item.image}} style={styles.menuImage} />
      <View style={{padding: 8}}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuRestaurant}>{restaurant.name}</Text>
        <Text style={styles.menuPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}>
        <Icon name="add" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={restaurant.image} style={styles.headerImage} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="arrowleft" size={20} color={'black'} />
        </TouchableOpacity>
        <View style={styles.infoRow}>
          <Icon name="star" size={16} color="orange" />
          <Text style={styles.infoText}>{restaurant.rating}</Text>
          <Icon
            name="bicycle"
            size={16}
            color="orange"
            style={{marginLeft: 10}}
          />
          <Text style={styles.infoText}>{restaurant.delivery}</Text>
          <Icon name="time" size={16} color="orange" style={{marginLeft: 10}} />
          <Text style={styles.infoText}>{restaurant.time}</Text>
        </View>
        <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
        <Text style={styles.description}>
          Maecenas sed diam eget risus varius blandit sit amet non magna.
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        </Text>
        <View style={styles.tagRow}>
          <TouchableOpacity style={styles.tagActive}>
            <Text style={styles.tagTextActive}>Burger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.tagText}>Sandwich</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.tagText}>Pizza</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Burger (10)</Text>
      </View>
      <FlatList
        data={restaurant.menu}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 12}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  infoText: {
    marginLeft: 4,
    marginRight: 10,
    color: '#555',
  },
  restaurantTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#999',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  tagRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  tag: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
  },
  tagActive: {
    backgroundColor: '#FFD88D',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
  },
  tagText: {
    color: '#333',
    fontWeight: '500',
  },
  tagTextActive: {
    color: '#FF5722',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 8,
    padding: 8,
    width: 160,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
    height: 200,
  },
  menuImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  menuName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuRestaurant: {
    fontSize: 12,
    color: '#999',
  },
  menuPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FF9800',
    borderRadius: 20,
    padding: 6,
  },
});
