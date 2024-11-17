import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
        <View style={styles.circle}>
          <Image source={require('../assets/images/arrow_left.png')} style={styles.image} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        marginTop : 25,
      },
      iconContainer: {
        padding: 5,
      },
      circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FC2EAA',
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 20,
        height: 20,
      },
    //   spacer: {
    //     flex: 1,
    //   },
    //   bookmarkContainer: {
    //     width: 40,
    //     height: 40,
    //     borderRadius: 20,
    //     backgroundColor: '#ffffff',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 5,
    //   },
})