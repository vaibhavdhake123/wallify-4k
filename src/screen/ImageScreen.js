import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallpaperManager from 'react-native-wallpaper-manager'; // Import the library

const ImageScreen = ({ route }) => {
  const { imageUrl } = route.params;
  const navigation = useNavigation();

  // Function to set wallpaper
  const setWallpaper = async () => {
    try {
      await WallpaperManager.setWallpaper({ uri: imageUrl }); // Set the wallpaper using the image URL
      Alert.alert('Success', 'Wallpaper set successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to set wallpaper. Please try again.');
    }
  };

  return (
    <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
            <View style={styles.circle}>
              <Icon name="keyboard-arrow-left" size={40} color={'black'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={setWallpaper}>
            <View style={styles.roundBox}>
              <Icon name="wallpaper" size={25} color={'black'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  iconContainer: {
    padding: 5,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageScreen;
