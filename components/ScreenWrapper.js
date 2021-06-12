import React from 'react';
import { View } from 'react-native';


const ScreenWrapper = ({ children }) => (
    <View style={{ flex: 1 }}>
        {children}
    </View>
)

export default ScreenWrapper;