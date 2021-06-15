import React from 'react';
import { StyleSheet } from 'react-native';

import { View , TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';

const CarItemUsage = ({ dataName , id , selectHandler , currentSelected }) => {
    const appendStyle = useStyle(style);
    const onSelect = () => {
        selectHandler({ value : id , isNested : true })
    }

    return (
        <TouchableOpacity style={[appendStyle.container , currentSelected === id ? appendStyle.selectedItem : null]} onPress={onSelect}>
            <Para align="center">{dataName}</Para>
        </TouchableOpacity>
    )
}

const style = ({ primary , secondary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "48%",
        borderWidth : 2,
        borderColor : secondary,
        borderRadius : baseBorderRadius,
        paddingVertical : 20,
        marginVertical : "2%",
        alignItems : 'center',
        justifyContent : 'center',
        height: 100,
        maxHeight : 200
    },
    selectedItem : {
        borderColor : generateColor(primary , 5),
    }

})

export default CarItemUsage