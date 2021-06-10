import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Router from './Router/Router';
import InitialLoading from './HOC/InitialLoading/InitialLoading';
import StyleProvider from './HOC/StyleProvider/StyleProvider';

export default function App() {
  
  return (
    <View style={generalStyle.appContainer}>
      <StyleProvider>
        <InitialLoading>
          <Router />
        </InitialLoading>
      </StyleProvider>
      <StatusBar style="auto" />
    </View>
  );
}


const generalStyle = StyleSheet.create({
  appContainer : {
    flex: 1
  }
})