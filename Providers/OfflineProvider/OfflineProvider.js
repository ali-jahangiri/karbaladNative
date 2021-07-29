import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import OfflineFallbackScreen from './OfflineScreenFallback';



const OfflineProvider = ({ children }) => {
    const netInfo = useNetInfo();
    if(netInfo.isInternetReachable === false) return <OfflineFallbackScreen />;
    else return children
}


export default OfflineProvider;