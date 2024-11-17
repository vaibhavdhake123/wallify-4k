import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window'); 

const Imgcard = ({ data,onPress }) => {
  const imageUrl = data.src?.portrait;

  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={[styles.image, { width: width * 0.47 }]} />
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
    shadow: {
      shadowColor: '#7F5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  },
  image: {
    borderRadius: 15,
    height:350,
    shadow: {
      shadowColor: '#7F5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  },
});

export default Imgcard;
