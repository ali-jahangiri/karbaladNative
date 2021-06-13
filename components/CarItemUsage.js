import React from 'react';
import { StyleSheet } from 'react-native';

import { View , TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';

const CarItemUsage = ({ dataName , id , selectHandler }) => {
    const appendStyle = useStyle(style)
    return (
        <TouchableOpacity style={appendStyle.container} onPress={() => selectHandler({dataName , id})}>
            <Para align="center">{dataName}</Para>
        </TouchableOpacity>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "48%",
        borderWidth : 2,
        borderColor : generateColor(primary , 4),
        borderRadius : baseBorderRadius,
        paddingVertical : 20,
        marginVertical : "2%",
        alignItems : 'center',
        justifyContent : 'center'
    }

})

export default CarItemUsage