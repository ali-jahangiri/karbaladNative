import React from 'react';
import { View } from 'react-native';


const ScreenWrapper = ({ children , extentStyle}) => (
    <View style={[{ flex: 1 } , extentStyle || {}]}>
        {children}
    </View>
)

export default ScreenWrapper;