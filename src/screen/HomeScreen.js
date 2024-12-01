import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import axios from 'axios';
import Imgcard from '../components/Imgcard';
import { Colors } from '../constant/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY_STORAGE_KEY = 'PEXELS_API_KEY';
const PEXELS_API_URL = 'https://api.pexels.com/v1/search?query=wallpaper';
const LAST_API_CALL_KEY = 'LAST_API_CALL_DATE';
const IMAGE_CACHE_KEY = 'IMAGE_CACHE';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date().toDateString();
      const lastApiCallDate = await AsyncStorage.getItem(LAST_API_CALL_KEY);
  
      // Check if the API was called today
      if (lastApiCallDate !== currentDate) {
        try {
          let apiKey = await AsyncStorage.getItem(API_KEY_STORAGE_KEY);
  
          // Cache the API key if not already stored
          if (!apiKey) {
            apiKey = '18KH9ElB71FhqYYFoTyC6TLfwEdP2pA4HPwweiIdPIkaFs3l9RVJTs5o';
            await AsyncStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
          }
  
          const response = await axios.get(PEXELS_API_URL, {
            headers: { Authorization: apiKey },
            params: { per_page: 50 },
          });
  
          // Store the fetched images in cache
          await AsyncStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(response.data.photos));
  
          // Update the last API call date
          await AsyncStorage.setItem(LAST_API_CALL_KEY, currentDate);
  
          // Shuffle the data
          const shuffledData = response.data.photos.sort(() => Math.random() - 0.5);
          // console.log("Shuffled Data:", shuffledData);  // Added log for debugging
          setData(shuffledData);
        } catch (err) {
          console.error("Error fetching data from Pexels API:", err);
          setError("Unable to fetch images. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        // If the API was called today, load cached images
        const cachedData = await AsyncStorage.getItem(IMAGE_CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          //console.log("Loaded Cached Data:", parsedData);  // Added log for debugging
          setData(parsedData);
          setLoading(false);
        } else {
          setError("No cached data found. Please try again later.");
        }
      }
    };
  
    fetchData();
  }, []);
  

  const handleCardPress = (imageUrl) => {
    navigation.navigate('ImageScreen', { imageUrl });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} backgroundColor={Colors.BackgroundColor} />
      <View style={{ marginTop: 40 }} />
      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Imgcard data={item} onPress={() => handleCardPress(item.src?.portrait)} />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
  },
  contentContainer: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
  },
});
