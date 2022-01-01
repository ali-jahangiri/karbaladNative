import React from 'react';
import { ScrollView,  View } from "react-native";
import { WebView } from 'react-native-webview';

import client from "../client";
import Para from '../components/Para';
import useData from '../Hooks/useData/useData';
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';

const TermsAndConditions = () => {
    const { termsAndConditions } = useData();

    return (
        <View style={{ flex : 1}}>
            <HeaderProvider isNested title={client.static.TERMS_AND_CONDITION_HEADER} />
            <View style={{ width : "95%" , marginHorizontal : "2.5%" , flex : 1 }}>
                <WebView 
                    originWhitelist={['*']}        
                    source={{ html : termsAndConditions }}
                />
            </View>
        </View>
    )
}


export default TermsAndConditions;