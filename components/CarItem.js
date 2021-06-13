import React from 'react';
import { StyleSheet, View , TouchableOpacity } from 'react-native';

import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import CarItemUsage from './CarItemUsage';
import Para from './Para';

const CarItem = ({ dataName , hasNestedData , nestedData , id , selectHandler , index }) => {
    const appendStyle = useStyle(style);
    
    const onPressHandler = () => {
        if(hasNestedData) {
            selectHandler(prev => ({...prev , id , nestedData }))
        }
    }

    return (
        <TouchableOpacity style={{ width : "48%" }} onPress={onPressHandler}>
                <View style={appendStyle.container}>    
                    <View style={appendStyle.indexWrapper}>
                        <Para size={10}>{index + 1}</Para>
                        <View style={appendStyle.bullet} />
                    </View>
                    <Para style={{ alignSelf : "center" }} align="center">{dataName}</Para>
                </View>
        </TouchableOpacity>
    )
}


const style = ({ primary , secondary , baseBorderRadius }) => StyleSheet.create({
    container : {
        paddingHorizontal : 10,
        paddingVertical : 15,
        borderWidth : 2,
        borderRadius : baseBorderRadius,
        borderColor : generateColor(primary , 3),
        marginVertical : 10,
        alignItems : 'flex-end',
        justifyContent : 'center',
    },
    itemSelected : {
        borderColor : generateColor(primary , 9),
        alignSelf : 'flex-end'
    },
    indexWrapper : {
        borderRadius : baseBorderRadius,
        alignItems : 'center',
        justifyContent : 'center',
    },
})

export default CarItem;