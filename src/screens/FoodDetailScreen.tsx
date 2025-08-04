// FoodDetailsScreen
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FoodDetailScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { foodId } = route.params;
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://192.168.0.110/food-backend/get_food_details.php?id=${foodId}`)
      .then(response => response.json())
      .then(data => {
        setFood(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching food details:', error);
        setLoading(false);
      });
  }, [foodId]);

  const handleOrderNow = () => {
    if (!food) return;

    navigation.navigate('DeliveryInfo', {
      price: parseFloat(food.price),
      foodId: foodId,
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  if (!food) {
    return (
      <View style={styles.centered}>
        <Text>Food item not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Image source={{ uri: food.image_url }} style={styles.foodImage} />

      <View style={styles.content}>
        <Text style={styles.title}>{food.name}</Text>

        <Text style={styles.description}>
          {food.description ?? 'No description available.'}
        </Text>

        <View style={styles.nutrition}>
          <Text style={styles.nutritionTitle}>Nutritional Information</Text>
          <Text style={styles.nutritionItem}>Calories: {food.calories ?? 'N/A'} kcal</Text>
          <Text style={styles.nutritionItem}>Protein: 20g</Text>
          <Text style={styles.nutritionItem}>Fat: 14g</Text>
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>
              {parseFloat(food.price).toFixed(2)} tk
            </Text>
          </View>
          <TouchableOpacity style={styles.orderButton} onPress={handleOrderNow}>
            <Text style={styles.orderText}>ORDER NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    paddingBottom: 40,
  },
  foodImage: {
    width: '100%',
    height: 320,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    padding: 24,
    marginTop: -30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F2937',
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  nutrition: {
    marginBottom: 25,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 15,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  nutritionItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  priceBox: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  priceText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  orderText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#E5E7EB',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  backArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
});

export default FoodDetailScreen;
