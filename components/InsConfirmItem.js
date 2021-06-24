import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';
import Para from './Para';


const InsConfirmItem = ({ label , value , index}) => {
    const appendStyle = useStyle(style);
    return (
        <View style={appendStyle.container}>
            {
                index ? <View style={appendStyle.divider} /> : null
            }
            <View style={appendStyle.labelContainer}>
                <Para align="center" color="grey" size={15}>{label}</Para>
            </View>
            <Para align="center" size={16}>{toFarsiNumber(value)}</Para>
        </View>
    )
}


const style = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {
        width: "90%",
        marginHorizontal : "5%",
        marginVertical : 10
    },
    labelContainer : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
    },
    divider : {
        height: 20,
        width: 3,
        backgroundColor : generateColor(primary , 2),
        borderRadius : baseBorderRadius,
        alignSelf : "center",
        marginBottom : 10
    }
})

export default InsConfirmItem;