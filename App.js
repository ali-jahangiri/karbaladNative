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


dayjs.extend(jalaliday);

export default function App() {
  return (
    <View style={generalStyle.appContainer}>
      <ErrorBoundary>
        <OfflineProvider>
          <StoreProvider store={myStore}>
            <CommutingProvider />
            <FetchProvider packageName={config.packageName} baseURL={`${config.serverPath}/MobileApi/`}>
              <StyleProvider>
                <InitialLoading>
                  <Router />
                </InitialLoading>
              </StyleProvider>
            </FetchProvider>
          </StoreProvider>
        </OfflineProvider>
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