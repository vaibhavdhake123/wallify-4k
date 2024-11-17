import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './src/Navigator/Navigation'
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
    <Navigation />
    <Toast />
  </>
  )
}

export default App

const styles = StyleSheet.create({})