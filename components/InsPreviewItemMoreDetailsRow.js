import React from 'react';
import { StyleSheet, View } from 'react-native';

import Para from './Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';


const InsPreviewItemMoreDetailsRow = ({ label , value , icon }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    return (
        <View style={appendStyle.container}>
                <Para weight="bold" size={18} align="center" color={generateColor(primary , 8)} >{toFarsiNumber(value)}</Para>
            <Para>{label}</Para>
        </View>
    )
}


const style = ({ baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginVertical : 3
    },
})


export default InsPreviewItemMoreDetailsRow;