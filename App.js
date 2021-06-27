import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Router from './Router/Router';
import InitialLoading from './HOC/InitialLoading/InitialLoading';
import StyleProvider from './HOC/StyleProvider/StyleProvider';
import AuthProvider from './Auth/AuthProvider';


import { ErrorBoundary } from "./Providers"
import StoreProvider from './Store/Y-state';

import myStore from './Store/myStore';


export default function App() {
  
  return (
    <View style={generalStyle.appContainer}>
      <ErrorBoundary>
        <StoreProvider store={myStore}>
          {/* <AuthProvider> */}
          <StyleProvider>
            <InitialLoading>
              <Router />
            </InitialLoading>
          </StyleProvider>
          {/* </AuthProvider> */}
        </StoreProvider>
      </ErrorBoundary>
      <StatusBar style="auto" />
    </View>
  );
}


const generalStyle = StyleSheet.create({
  appContainer : {
    flex: 1
  }
})