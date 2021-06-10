import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useStyle } from '../Hooks/useStyle';

import Para from './Para';

const TabScreenHeader = ({ navigation , title = "string" }) => {
    const appendStyle = useStyle(style)
    
    return (
        <View style={appendStyle.container}>
            <TouchableOpacity style={appendStyle.backBtn} onPress={navigation.goBack}>
                <Feather name="arrow-left" size={30} color="white" />
            </TouchableOpacity>
            <Para numberOfLines={1} size={22} color="white"  weight="bold">{title}</Para>
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        backgroundColor : primary,
        flexDirection : 'row',
        alignItems : 'center',
        height: 120,
        justifyContent : 'space-between',
        paddingHorizontal : "5%",
        paddingTop : StatusBar.currentHeight 
    },
    backBtn : {
        backgroundColor : "#fff2",
        padding: 12,
        borderRadius : baseBorderRadius,
    }
})


export default TabScreenHeader;