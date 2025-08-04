import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const OrderSummaryScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { name, address, phone, foodId, price } = route.params;

  const handlePlaceOrder = async () => {
    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Not Logged In', 'Please log in first.');
      return;
    }

    const email = user.email;

    try {
      const response = await fetch('http://192.168.0.110/food-backend/place_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          names: name,
          email,
          foodId,
          address,
          phone,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Your order has been placed!');
        navigation.navigate('Success');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{name}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{address}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{phone}</Text>

        {/* <Text style={styles.label}>Food ID:</Text>
        <Text style={styles.value}>{foodId}</Text> */}

        <Text style={styles.label}>item Price:</Text>
        <Text style={styles.price}>{parseFloat(price).toFixed(2)} tk</Text>

         <Text style={styles.label}>VAT (7%):</Text>
          <Text style={styles.value}>
            {(parseFloat(price) * 0.07).toFixed(2)} tk
          </Text>

          <Text style={styles.label}>Delivery Charge:</Text>
          <Text style={styles.value}>60.00 tk</Text>

          <Text style={styles.label}>Total Price:</Text>
          <Text style={styles.price}>
            {(parseFloat(price) + parseFloat(price) * 0.07 + 60).toFixed(2)} tk
          </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSummaryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
    alignSelf: 'center',
  },
  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
  },
  value: {
    fontSize: 17,
    color: '#111827',
    marginTop: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
    marginTop: 16,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
