import {
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Octicons';
import Imgcard from '../components/Imgcard';
import {Colors} from '../constant/Colors';
import {deviceWidth} from '../constant/Scaling';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY_STORAGE_KEY = 'PEXELS_API_KEY';
const PEXELS_API_URL = 'https://api.pexels.com/v1/search?query={text}';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let apiKey = await AsyncStorage.getItem(API_KEY_STORAGE_KEY);

      if (!apiKey) {
        apiKey = '18KH9ElB71FhqYYFoTyC6TLfwEdP2pA4HPwweiIdPIkaFs3l9RVJTs5o';
        await AsyncStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
      }

      const response = await axios.get(PEXELS_API_URL.replace('{text}', text), {
        headers: {Authorization: apiKey},
        params: {per_page: 10},
      });

      const shuffledData = response.data.photos.sort(() => Math.random() - 0.5);
      setData(shuffledData);
    } catch (err) {
      console.error('Error fetching data from Pexels API:', err);
      setError('Unable to fetch images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (text.trim() !== '') {
      fetchData();
    } else {
      setError('Please enter a search query.');
    }
  };

  const handleCardPress = imageUrl => {
    navigation.navigate('ImageScreen', {imageUrl});
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 40}} />
      <View style={styles.flexRow}>
        <Icon name="search" size={25} color="black" style={{marginRight: 10}} />
        <TextInput
          style={styles.inputText}
          placeholder="Search Text ..."
          placeholderTextColor="grey"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      <View style={{marginTop: 20}} />
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {!loading && !error && data.length > 0 && (
        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Imgcard
              data={item}
              onPress={() => handleCardPress(item.src?.portrait)}
            />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      )}

      {!loading && error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && data.length === 0 && text.trim() !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            No results found.
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
    alignItems: 'center',
  },
  flexRow: {
    width: deviceWidth * 0.9,
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 13,
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 5,
  },
  loaderContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
