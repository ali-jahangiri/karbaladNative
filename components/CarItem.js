import React from 'react';
import { StyleSheet, View , TouchableOpacity } from 'react-native';

import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import CarItemUsage from './CarItemUsage';
import Para from './Para';

const CarItem = ({ dataName , hasNestedData , nestedDataName , nestedData , id , selectHandler , index }) => {
    const appendStyle = useStyle(style);
    
    const onPressHandler = () => {
        if(hasNestedData) {

        }
    }

    return (
        <TouchableOpacity onPress={onPressHandler}>
                <View style={appendStyle.container}>    
                    <Para >{dataName}</Para>
                    <View style={appendStyle.indexWrapper}>
                        <Para>{index + 1}</Para>
                    </View>
                </View>
        </TouchableOpacity>
    )
}


const style = ({ primary , secondary , baseBorderRadius }) => StyleSheet.create({
    container : {
        paddingHorizontal : 10,
        paddingVertical : 20,
        borderWidth : 2,
        borderRadius : baseBorderRadius,
        borderColor : generateColor(primary , 3),
        marginVertical : 10
    },
    itemSelected : {
        borderColor : generateColor(primary , 9)
    },
    indexWrapper : {

    }
})

export default CarItem;