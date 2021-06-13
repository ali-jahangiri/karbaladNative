import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';

import { Feather } from '@expo/vector-icons';

const InsStageController = ({ onNext , onPrevious }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    return (
        <View style={appendStyle.container}>
            <TouchableOpacity style={[appendStyle.btn , { backgroundColor : generateColor(primary , 9) }]}>
                <Feather name="chevron-left" size={24} color="black" />
                <Para align="center" weight="bold" onPress={onNext}>مرحله بعد</Para>
            </TouchableOpacity>
            <TouchableOpacity style={[appendStyle.btn , { backgroundColor : "#d3d3d317" }]}>
                <Para align="center" weight="bold" onPress={onPrevious}>مرحله قبل</Para>
                <Feather name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "100%",
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop: 10
    },
    btn : {
        width: "49%",
        borderRadius : baseBorderRadius,
        paddingVertical: 15,
        flexDirection : 'row',
        justifyContent : 'center'
    }
    
})

export default InsStageController;