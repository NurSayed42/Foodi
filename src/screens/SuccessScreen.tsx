import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SuccessScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>✔</Text>
        <Text style={styles.success}>Success !</Text>
        <Text style={styles.message}>
          Your payment was successful. A receipt for this purchase has been sent to your email.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    paddingVertical: 40,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  icon: {
    fontSize: 60,
    color: '#4BB543', // soft green
    marginBottom: 15,
  },
  success: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginTop: 10,
  },
  button: {
    marginTop: 25,
    backgroundColor: '#4BB543',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SuccessScreen;
