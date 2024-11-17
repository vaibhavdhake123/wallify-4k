import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import SearchScreen from '../screen/SearchScreen';
import AboutScreen from '../screen/AboutScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

function BottomBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          backgroundColor: 'white',
          borderRadius: 15,
          height: 60,
          marginBottom: 50,
          marginLeft: 30,
          marginRight: 30,
          ...styles.shadow,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarIconStyle: {
          alignItems: 'center', // Ensures icon is horizontally centered
          justifyContent: 'center', // Centers icon vertically within the tab
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="home"
              size={size}
              color={color}
              style={{marginTop: 2}}
            />
          ), // Adjust icon margin slightly to center better
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="search1"
              size={size}
              color={color}
              style={{marginTop: 2}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="profile"
              size={size}
              color={color}
              style={{marginTop: 2}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomBar;

const styles = StyleSheet.create({
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
});
