import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';



const Btn = ({ title , icon , onPress , bgAlpha = 8 , extendStyle , disabled = false }) => {
    const appendStyle = useStyle(style , bgAlpha)
    const { ctaTextColor } = useStyle();

    return (
        <TouchableOpacity disabled={disabled} style={[appendStyle.btn , extendStyle , disabled ? appendStyle.disabled : {} ]} onPress={onPress}>
            {
                !!icon && <Feather style={{ marginRight : 5 }} name={icon} size={24} color={ctaTextColor} />
            }
            <Para weight="bold" size={16} color={ctaTextColor}>{title}</Para>
        </TouchableOpacity>
    )
}

const style = ({ primary , baseBorderRadius } , bgAlpha ) => StyleSheet.create({
    btn : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : bgAlpha ?  generateColor(primary , bgAlpha) : primary,
        padding : 15,
        borderRadius : baseBorderRadius,
    },
    disabled : {
        opacity: 0.5
    }
})

export default Btn;