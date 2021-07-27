import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import OfflineFallbackScreen from './OfflineScreenFallback';



const OfflineProvider = ({ children }) => {
    const netInfo = useNetInfo();
    if(netInfo.isInternetReachable) return children;
    else return <OfflineFallbackScreen />
}


export default OfflineProvider;