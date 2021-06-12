import React from 'react';
import { StyleSheet } from 'react-native';

import { View , TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';

const CarItemUsage = ({ name , id , selectHandler }) => {
    const appendStyle = useStyle(style)

    return (
        <TouchableOpacity onPress={() => selectHandler({name , id})}>
            <View style={appendStyle.container}>
                <Para>{name}</Para>
            </View>
        </TouchableOpacity>
    )
}

const style = () => StyleSheet.create({
    container : {

    }
})

export default CarItemUsage