import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';

import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';

const EmptyState = ({ actionHandler , ctaText , title , desc }) => {
    const appendStyle = useStyle(style);

    return (
        <View style={appendStyle.container}>
            <Feather style={appendStyle.icon} name="archive" size={40} color="black" />
            <Para size={20} align="center">{title}</Para>
            <Para align="center" style={{ marginVertical : 5 }} color="grey" size={14}>{desc}</Para>
            <TouchableOpacity style={appendStyle.cta} onPress={actionHandler}>
                <Para weight="bold" align='center'>{ctaText}</Para>
            </TouchableOpacity>
        </View>
    )
}


const style = ({ primary, baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "90%",
        marginHorizontal : "5%",
        flex : 1,
        justifyContent: 'center',
    },  
    icon : {
        alignSelf : "center",
        color: generateColor(primary , 5),
        marginBottom : 10
    },
    cta : {
        backgroundColor : generateColor(primary , 5),
        padding : 15,
        borderRadius : baseBorderRadius,
        marginTop : 10       
    }
})

export default EmptyState;