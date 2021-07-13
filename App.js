import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Router from './Router/Router';
import InitialLoading from './HOC/InitialLoading/InitialLoading';
import StyleProvider from './HOC/StyleProvider/StyleProvider';


import { ErrorBoundary } from "./Providers"
import StoreProvider from './Store/Y-state';

import myStore from './Store/myStore';
import FetchProvider from './Providers/useFetch/FetchProvider';
import config from './config';
import axios from 'axios';


export default function App() {



  // axios.get("https://api.mediaad.org/v1/events/page/loaded?fid=9b17af6e-2871-4bcf-a407-a514b49eeae6")
  //   .then(data => {
  //     console.log(data);
  //   }).catch(err => {
  //     console.log('err' , err);
  //   })
  
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