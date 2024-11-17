import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import Toast from 'react-native-toast-message';

const ImageScreen = ({route}) => {
  const {imageUrl} = route.params;
  const navigation = useNavigation();

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ]);

        // Check if all permissions are granted
        return (
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          (Platform.Version < 33 ||
            granted['android.permission.READ_MEDIA_IMAGES'] ===
              PermissionsAndroid.RESULTS.GRANTED)
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS does not need this permission
  };

  const handleDownload = async imageUrl => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Toast.show({
        type: 'error',
        text1: 'Permission Denied',
        text2: 'Storage permission is required to save the image.',
      });
      return;
    }

    try {
      // Download image to the cache directory
      console.log('Download path:', downloadPath);
      const downloadPath = `${RNFS.DownloadDirectoryPath}/downloaded_image.jpg`;
      await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadPath,
      }).promise;

      // Save the downloaded file to the gallery
      await CameraRoll.save(downloadPath, {type: 'photo'});
      Toast.show({
        type: 'success',
        text1: 'Download Complete',
        text2: 'Your image has been saved to the gallery.',
      });
    } catch (error) {
      console.error('Error saving image:', error);
      Toast.show({
        type: 'error',
        text1: 'Download Failed',
        text2: 'There was an error downloading the image.',
      });
    }
  };

  return (
    <ImageBackground
      source={{uri: imageUrl}}
      style={styles.imageBackground}
      resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconContainer}>
            <View style={styles.circle}>
              <Icon name="keyboard-arrow-left" size={40} color={'black'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDownload}>
            <View style={styles.roundBox}>
              <Icon name="download" size={25} color={'black'} />
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
