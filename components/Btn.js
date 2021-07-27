import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';



const Btn = ({ title , icon , onPress , bgAlpha = 8 , extendStyle }) => {
    const appendStyle = useStyle(style , bgAlpha , extendStyle)
    const { ctaTextColor } = useStyle();

    return (
        <TouchableOpacity style={[appendStyle.btn , extendStyle]} onPress={onPress}>
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
        backgroundColor : generateColor(primary , bgAlpha),
        padding : 15,
        borderRadius : baseBorderRadius,
    },
})

export default Btn;