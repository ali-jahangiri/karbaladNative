import { useIsFocused } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';


const TabBarItem = ({ onPress , children , title }) => {
    const isFocused  = useIsFocused();
    const appendStyle = useStyle(style , isFocused ? {} : null);

    return (
        <TouchableOpacity style={appendStyle.container} onPress={onPress}>
            <View style={{ flex : 1 }}>
                {children}
            </View>
            {
                title ? <Para style={{ ...appendStyle.titleText ,  ...(title && appendStyle.containerSpace)}}>{title}</Para> : null
            }
            {
                !title && isFocused && <View style={appendStyle.circle}></View>
            }
        </TouchableOpacity>
    )
}

const style = ({ primary , baseBorderRadius , titleTextColor , titleFontSize } , isFocused) => StyleSheet.create({
    container : {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    circle : {
        width: 10,
        height: 10,
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        marginBottom : 10
    },
    containerSpace : {
        marginBottom : 10,
    },
    titleText : {
        fontSize : titleFontSize,
        color : isFocused ? primary : titleTextColor
    }
})

export default TabBarItem;