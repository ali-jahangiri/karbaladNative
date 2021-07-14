import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import Para from './Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';


const InsPreviewItemMoreDetailsRow = ({ label , value }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    return (
        <View style={appendStyle.container}>
            <LinearGradient start={[1,0]} end={[0,1]} style={appendStyle.linearContainer}  colors={[generateColor(primary , 4), 'transparent']}>
                <Para weight="bold" size={18} align="center" color={generateColor(primary , 8)} >{toFarsiNumber(value)}</Para>
            </LinearGradient>
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
    linearContainer: {
        width : "40%",
        padding: 10,
        borderTopRightRadius : baseBorderRadius,
        borderBottomRightRadius : baseBorderRadius,
        height: 60,
        alignItems : 'center',
        justifyContent : 'center'
    }
})


export default InsPreviewItemMoreDetailsRow;