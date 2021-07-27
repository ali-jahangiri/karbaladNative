import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { useStyle } from '../Hooks/useStyle';
import DirectionCta from './DirectionCta';

import Para from './Para';


const TabScreenHeader = ({ title = "string" , extendStyle }) => {
    const appendStyle = useStyle(style , extendStyle)
    const { headerTitleColor } = useStyle()
    const navigation = useNavigation()

    return (
        <View style={appendStyle.container}>
            <DirectionCta onPress={navigation.goBack} />
            <Para numberOfLines={1} size={22} color={headerTitleColor}  weight="bold">{title}</Para>
        </View>
    )
}

const style = ({ primary } , extendStyle) => StyleSheet.create({
    container : {
        backgroundColor : primary,
        flexDirection : 'row',
        alignItems : 'center',
        height: 130,
        justifyContent : 'space-between',
        paddingHorizontal : "5%",
        paddingTop : StatusBar.currentHeight,
        ...extendStyle,
    },
    
})


export default TabScreenHeader;