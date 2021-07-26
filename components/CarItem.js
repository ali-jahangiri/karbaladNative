import React from 'react';
import { StyleSheet, View , TouchableOpacity } from 'react-native';

import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';

const CarItem = ({ dataName , hasNestedData , nestedData , id , selectHandler , currentSelected }) => {
    const appendStyle = useStyle(style);
    
    const onPressHandler = () => {
        if(hasNestedData) {
            selectHandler({ value : id });
            selectHandler(({ value : null , isNested : true }))
            selectHandler({ key : "usageItems" , value : nestedData });
        }
    }

    return (
        <TouchableOpacity style={{ width : "48%" }} onPress={onPressHandler}>
                <View style={[appendStyle.container , currentSelected === id ? appendStyle.selectedItem : null]}>    
                    <Para style={{ alignSelf : "center" }} align="center">{dataName}</Para>
                </View>
        </TouchableOpacity>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        paddingHorizontal : 10,
        paddingVertical : 15,
        borderWidth : 2,
        borderRadius : baseBorderRadius,
        borderColor : generateColor(primary , 3),
        marginVertical : 10,
        alignItems : 'flex-end',
        justifyContent : 'center',
        height: 100,
        maxHeight : 200
    },
    selectedItem : {
        backgroundColor : generateColor(primary , 5),
        borderColor : generateColor(primary , 5),
    }
})

export default CarItem;