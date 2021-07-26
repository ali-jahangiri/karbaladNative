import React from 'react';
import { StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';

const CarItemUsage = ({ dataName , id , selectHandler , currentSelected }) => {
    const appendStyle = useStyle(style);
    return (
        <TouchableOpacity 
            style={[appendStyle.container , currentSelected === id ? appendStyle.selectedItem : null]} 
            onPress={() => selectHandler({ value : id , isNested : true })}>
            <Para align="center">{dataName}</Para>
        </TouchableOpacity>
    )
}

const style = ({ primary ,  baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "48%",
        borderWidth : 2,
        borderColor : generateColor(primary , 3),
        borderRadius : baseBorderRadius,
        paddingVertical : 20,
        marginVertical : "2%",
        alignItems : 'center',
        justifyContent : 'center',
        height: 100,
        maxHeight : 200,
    },
    selectedItem : {
        backgroundColor : generateColor(primary , 5),
        borderColor : generateColor(primary , 5)
    }

})

export default CarItemUsage