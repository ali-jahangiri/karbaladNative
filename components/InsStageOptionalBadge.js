import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';

import { Feather } from '@expo/vector-icons';
import client from '../client';
import Para from './Para';
import { generateColor } from '../utils';



const InsStageOptionalBadge = () => {
    const appendStyle = useStyle(style);

    return (
        <View style={appendStyle.container}>
            <Feather style={appendStyle.icon} name="check" size={24} color="black" />
            <Para>{client.static.OPTIONAL_STEP_TEXT}</Para>
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : generateColor(primary, 2) , 
        borderRadius : baseBorderRadius,
        padding: 10,
    },
    icon : {
        color: primary,
        marginRight : 5
    }
})

export default InsStageOptionalBadge;