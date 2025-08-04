import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // আগের 'Home' কে বদলে 'Login'
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Foodi</Text>
      <View style={styles.burgerContainer}>
        {/* এখানে তুমি চাইলে burger image রাখতে পারো */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'cursive',
  },
  burgerContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    gap: 10,
  },
  burger: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
