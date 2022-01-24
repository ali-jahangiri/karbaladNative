import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import dayjs from "dayjs";
import jalaliday from "jalaliday";

import Router from './Router/Router';

// Providers
import InitialLoading from './HOC/InitialLoading/InitialLoading';
import StyleProvider from './HOC/StyleProvider/StyleProvider';
import StoreProvider from './Store/Y-state';
import { ErrorBoundary } from "./Providers"
import FetchProvider from './Providers/useFetch/FetchProvider';
import CommutingProvider from './Providers/CommutingProvider';



import myStore from './Store/myStore';
import config from './config';
import OfflineProvider from './Providers/OfflineProvider/OfflineProvider';
import DataProvider from './HOC/DataProvider/DataProvider';
const ReactNative = require('react-native');


dayjs.extend(jalaliday);

try {
  ReactNative.I18nManager.allowRTL(false);
} catch (e) {}

export default function App() {
  return (
    <View style={generalStyle.appContainer}>
      <ErrorBoundary>
        {/* <OfflineProvider> */}
          <StoreProvider store={myStore}>
            <CommutingProvider />
            <FetchProvider packageName={config.packageName} baseURL={`${config.serverPath}/MobileApi/`}>
              <StyleProvider>
                <DataProvider>
                  <InitialLoading>
                    <Router />
                  </InitialLoading>
                </DataProvider>
              </StyleProvider>
            </FetchProvider>
          </StoreProvider>
        {/* </OfflineProvider> */}
      </ErrorBoundary>
      <StatusBar style="auto" />
    </View>
  );
}


const generalStyle = StyleSheet.create({
  appContainer : {
    flex: 1,
  }
})