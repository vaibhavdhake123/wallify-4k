import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Linking,
  Alert,
  Share,
} from 'react-native';
import React from 'react';
import {Colors} from '../constant/Colors';
import {deviceHeight, deviceWidth} from '../constant/Scaling';

const AboutScreen = () => {


  const getPackageName = () => {
    return 'com.wallify.pawsomecreations'; // Replace with your app's package name
  };


  const handleAbout = async () => {
    const url = 'https://pawsomecreation.blogspot.com/';

    try {
      // Open the URL directly without checking if it can be opened
      console.log('Attempting to open URL...');
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error opening URL:', error);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  const handlelegal = async () => {
    const url =
      'https://happypawsstudio.blogspot.com/p/cook-crafter-privacy-policy.html';
    try {
      console.log('Attempting to open URL...');
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error opening URL:', error);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  const handleRateUs = () => {
    const appStoreUrl = Platform.select({
      ios: 'https://apps.apple.com/app/idYOUR_APP_ID', // Replace 'YOUR_APP_ID' with your actual App Store ID
      android: 'https://play.google.com/store/apps/details?id=com.wallify.pawsomecreations', // Replace 'YOUR_PACKAGE_NAME' with your app's package name
    });
  
    Alert.alert(
      'Rate Us',
      'Thank you for your support! Please rate us on the app store.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Rate Now',
          onPress: () => {
            if (appStoreUrl) {
              Linking.openURL(appStoreUrl).catch((err) =>
                console.error('Failed to open URL:', err)
              );
            } else {
              console.error('App store URL is not defined.');
            }
          },
        },
      ]
    );
  };
  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: `Check out this awesome app: https://play.google.com/store/apps/details?id=${getPackageName()}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('App shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 40}}></View>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{height: 150, width: 150, borderRadius: 40}}
        />
      </View>
      <View style={styles.cardContainer}>
      
        <TouchableOpacity onPress={handleAbout}>
          <View style={styles.row}>
            <Text style={styles.text}>ABOUT US..!</Text>
            <Image
              source={require('../assets/images/info.png')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRateUs}>
          <View style={styles.row}>
            <Text style={styles.text}>RATE NOW..!</Text>
            <Image
              source={require('../assets/images/star.png')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShareApp}>
          <View style={styles.row}>
            <Text style={styles.text}>SHARE NOW..!</Text>
            <Image
              source={require('../assets/images/send.png')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlelegal}>
          <View style={styles.row}>
            <Text style={styles.text}>PRIVACY POLICY</Text>
            <Image
              source={require('../assets/images/legal.png')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            BackHandler.exitApp();
          }}>
          <View style={styles.row}>
            <Text style={styles.text}>Exit</Text>
            <Image
              source={require('../assets/images/logout.png')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imgContainer: {
    marginTop: 20,
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    width: deviceWidth * 0.9,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderColor: 'black',
    borderRadius: 0.1,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  img: {
    width: 30,
    height: 30,
  },
});
