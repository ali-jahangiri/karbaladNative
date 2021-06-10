import { useIsFocused } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';


const TabBarItem = ({ onPress , children }) => {
    const isFocused  = useIsFocused()

    const appendStyle = useStyle(style)
    return (
        <TouchableOpacity style={appendStyle.container} onPress={onPress}>
            <View style={{ flex : 1 }}>
                {children}
            </View>
            {
                isFocused && <View style={appendStyle.circle}></View>
            }
        </TouchableOpacity>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
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
    }
})

export default TabBarItem;