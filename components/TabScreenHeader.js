import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { useStyle } from '../Hooks/useStyle';
import NextStepBtn from './NextStepBtn';

import Para from './Para';

const TabScreenHeader = ({ navigation , title = "string" , extendStyle }) => {
    const appendStyle = useStyle(style , extendStyle)
    
    return (
        <View style={appendStyle.container}>
            <NextStepBtn onPress={navigation.goBack} />
            <Para numberOfLines={1} size={22} color="white"  weight="bold">{title}</Para>
        </View>
    )
}

const style = ({ primary } , extendStyle) => StyleSheet.create({
    container : {
        backgroundColor : primary,
        flexDirection : 'row',
        alignItems : 'center',
        height: 120,
        justifyContent : 'space-between',
        paddingHorizontal : "5%",
        paddingTop : StatusBar.currentHeight,
        ...extendStyle
    },
    
})


export default TabScreenHeader;