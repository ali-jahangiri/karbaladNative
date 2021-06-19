import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useStyle } from '../Hooks/useStyle';

const NextStepBtn = ({ onPress , iconColor = 'white' , containerBgColor , extendStyle= {} , direction = "left"}) => {
    const appendStyle = useStyle(style , containerBgColor);

    return (
        <TouchableOpacity style={[appendStyle.btn , extendStyle]} onPress={onPress}>
                    <Feather name={`arrow-${direction}`} size={30} color={iconColor} />
        </TouchableOpacity>
    )
}


const style = ({ baseBorderRadius } , containerBgColor) => StyleSheet.create({
    btn : {
        backgroundColor : containerBgColor || "#fff2",
        padding: 12,
        borderRadius : baseBorderRadius,
    }
})

export default NextStepBtn;