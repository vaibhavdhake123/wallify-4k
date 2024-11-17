import {StyleSheet, Text, View,StatusBar} from 'react-native';
import React from 'react';
import { Colors } from '../constant/Colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
     <StatusBar hidden={true} backgroundColor={'black'} />

    </View>
  );

 
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor
  },
});
