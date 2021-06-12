import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Para from './Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';


const InsuranceCart = ({ icon , name , onItemPress , cat , id }) => {
    const appendStyle = useStyle(style);

    return (
        <TouchableWithoutFeedback style={{ flex : 1 }} onPress={() => onItemPress({cat , name , id})}>
            <View style={appendStyle.container}>
                <Para size={18}>{name}</Para>
                {/* TODO later add webIcon image component with this mock image */}
                <Feather name="arrow-down-left" size={24} color="black" />
            </View>
        </TouchableWithoutFeedback>
    )
}

const style = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {
        width: "47%",
        marginVertical : "3%",
        backgroundColor : generateColor(primary , 5),
        height: 200,
        justifyContent : 'space-between',
        padding: 10,
        borderRadius : baseBorderRadius,
    }
})


export default InsuranceCart;