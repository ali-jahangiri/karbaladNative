import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Router from './Router/Router';

import InitialLoading from './HOC/InitialLoading/InitialLoading';
import StyleProvider from './HOC/StyleProvider/StyleProvider';
import StoreProvider from './Store/Y-state';
import { ErrorBoundary } from "./Providers"
import FetchProvider from './Providers/useFetch/FetchProvider';



import myStore from './Store/myStore';
import config from './config';



export default function App() {
  return (
    <View style={generalStyle.appContainer}>
      <ErrorBoundary>
        <StoreProvider logger store={myStore}>
          <FetchProvider packageName={config.packageName} baseURL={`${config.serverPath}/MobileApi/`}>
            <StyleProvider>
              <InitialLoading>
                <Router />
              </InitialLoading>
            </StyleProvider>
          </FetchProvider>
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