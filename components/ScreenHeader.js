import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { useStyle } from '../Hooks/useStyle';

import { generateColor } from "../utils";

import Para from './Para';

const TabHeaderBadge = ({ title}) => {
    const appendStyle =  useStyle(style)
    return (
        <View style={appendStyle.container}>
        <Para 
            weight="bold"
            size={24} 
            style={appendStyle.text}
            align="center"
            >
            {title}
        </Para>
    </View>
    )
}

const style = ({ primary , baseBorderRadius }) => {
    return StyleSheet.create({
        container : {
            marginTop : StatusBar.currentHeight + 20 ,
            minWidth: "40%",
            height: 60,
            alignItems : 'center',
            justifyContent : 'center',
            backgroundColor : generateColor(primary , 1),
            borderRadius : baseBorderRadius,
            paddingHorizontal : 20,
            marginHorizontal : "55%",
            marginBottom: 10
        },
        text : {
            color:primary
        }
    })
}

export default TabHeaderBadge;