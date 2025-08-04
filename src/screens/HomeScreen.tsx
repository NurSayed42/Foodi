import React, { useEffect, useState } from 'react'; 
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { auth } from '../firebase/firebase';

const HomeScreen = ({ navigation }: any) => {
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scaleAnim, setScaleAnim] = useState(new Animated.Value(1));
  const [searchText, setSearchText] = useState('');

  const categories = ['All', 'Fast Food', 'Italian'];

  useEffect(() => {
    const user = auth().currentUser;
    if (user?.email) {
      fetch('http://192.168.0.110/food-backend/save_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });
    }
  }, []);

  useEffect(() => {
    fetch('http://192.168.0.110/food-backend/get_foods.php')
      .then(response => response.json())
      .then(data => setFoodItems(data))
      .catch(error => console.error('Error fetching foods:', error));
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const filteredItems =
    selectedCategory === 'All'
      ? foodItems.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : foodItems
          .filter(item => item.category === selectedCategory)
          .filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          );

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Foodi</Text>
      <Text style={styles.header}>Delicious Food Delivery</Text>

      {/* Order History Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#376fb8',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignSelf: 'center',
          marginBottom: 15,
        }}
        onPress={() => navigation.navigate('OrderHistory')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          View My Order History
        </Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search food..."
          placeholderTextColor="#888"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          value={searchText}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('FoodDetail', { foodId: item.id })}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                Toast.show({
                  type: 'success',
                  text1: `${item.name} added to cart!`,
                });
              }}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Text style={styles.emojiText}>🛒</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  head: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 1,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  emojiText: {
    fontSize: 15,
    color: 'black',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    minHeight: 40,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical:6,
    paddingHorizontal:16,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 25,
  },
  activeCategoryButton: {
    backgroundColor: '#FF6347',
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeCategoryText: {
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 1,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
    width: '48%',
  },
  cardContent: {
    padding: 15,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  detailsButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconButton: {
    position: 'absolute',
    bottom: 224,
    right: 5,
    backgroundColor: '#F9F6EE',
    padding: 3,
    borderRadius: 50,
    elevation: 5,
  },
});

export default HomeScreen;
