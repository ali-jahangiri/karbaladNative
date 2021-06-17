import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';

import { Feather } from '@expo/vector-icons';

const conditionCase = "اتمام";

const InsStageController = ({ onNext , onPrevious , backLabel , nextLabe }) => {
    
    const appendStyle = useStyle(style , nextLabe === "اتمام" && 1.5);
    const { primary } = useStyle();
    return (
        <View style={appendStyle.container}>
            <TouchableOpacity onPress={onNext} style={[appendStyle.btn , { backgroundColor : generateColor(primary , 9) , width : nextLabe === conditionCase ? "55%" : "49%" }]}>
                <Feather name="chevron-left" size={24} color="black" />
                <Para align="center" weight="bold" >{nextLabe || "مرحله بعد"}</Para>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPrevious} style={[appendStyle.btn , { backgroundColor : "#d3d3d317" , width : nextLabe === conditionCase ? "35%" : "49%" }]}>
                <Para align="center" weight="bold" >{backLabel || "مرحله قبل"}</Para>
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