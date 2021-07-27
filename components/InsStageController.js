import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';

import { Feather } from '@expo/vector-icons';
import client from '../client';

const { CONDITION_CASE_FOR_INS_CONTROLLER } = client.static.SYSTEM_KEY

const InsStageController = ({ onNext , onPrevious , backLabel , nextLabe }) => {
    
    const appendStyle = useStyle(style);
    const { primary , ctaTextColor } = useStyle();
    
    return (
        <View style={appendStyle.container}>
            <TouchableOpacity onPress={onNext} style={[appendStyle.btn , { backgroundColor : generateColor(primary , 9) , width : nextLabe === CONDITION_CASE_FOR_INS_CONTROLLER ? "55%" : "49%" }]}>
                <Feather name={`${nextLabe ? "check-circle" : "chevron-left"}`} style={{ marginRight : nextLabe ? 10 : 0 }} size={24} color={ctaTextColor} />
                <Para align="center" weight="bold" color={ctaTextColor}>{nextLabe || "مرحله بعد"}</Para>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPrevious} style={[appendStyle.btn , { backgroundColor : `${client.style.colors.insStageBackStepBgColor}` , width : nextLabe === CONDITION_CASE_FOR_INS_CONTROLLER ? "40%" : "49%" }]}>
                <Para align="center" weight="bold" color={ctaTextColor} >{backLabel || "مرحله قبل"}</Para>
                <Feather name="chevron-right" size={24} color={ctaTextColor} />
            </TouchableOpacity>
        </View>
    )
}

const style = ({  baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "100%",
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop: 10
    },
    btn : {
        width: "49%",
        borderRadius : baseBorderRadius,
        paddingVertical: 20,
        flexDirection : 'row',
        justifyContent : 'center'
    }
    
})

export default InsStageController;