import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';

const DirectionCta = ({ onPress , iconColor = 'white' , containerBgColor , extendStyle= {} , direction = "left" , icon = `arrow-${direction}` }) => {
    const appendStyle = useStyle(style , containerBgColor);
    return (
        <TouchableOpacity style={[appendStyle.btn , extendStyle]} onPress={onPress}>
            <Feather name={icon} size={30} color={iconColor} />
        </TouchableOpacity>
    )
}


const style = ({ baseBorderRadius , primary } , overwriteBgColorFromParentInvoker) => StyleSheet.create({
    btn : {
        backgroundColor : overwriteBgColorFromParentInvoker || generateColor(primary , 8),
        padding: 12,
        borderRadius : baseBorderRadius,
    }
})

export default DirectionCta;