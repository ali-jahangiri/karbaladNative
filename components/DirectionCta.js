import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useStyle } from '../Hooks/useStyle';

const DirectionCta = ({ onPress , iconColor = 'white' , containerBgColor , extendStyle= {} , direction = "left" , icon = `arrow-${direction}` }) => {
    const appendStyle = useStyle(style , containerBgColor);
    return (
        <TouchableOpacity style={[appendStyle.btn , extendStyle]} onPress={onPress}>
            <Feather name={icon} size={30} color={iconColor} />
        </TouchableOpacity>
    )
}


const style = ({ baseBorderRadius } , passed) => StyleSheet.create({
    btn : {
        backgroundColor : (() => {
            // containerBgColor || "#fff2"
            console.log(passed , "EX");
            return "red"
        })(),
        padding: 12,
        borderRadius : baseBorderRadius,
    }
})

export default DirectionCta;