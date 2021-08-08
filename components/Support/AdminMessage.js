import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { toFarsiNumber } from '../../utils';
import Para from '../Para';


import { style as baseStyle } from "./UserMessage"

const AdminMessage = ({ message ,  time }) => {
    const appendStyle = useStyle(style);
    return (
        <View style={appendStyle.container}>
            <View style={{ flexDirection : 'row' , alignContent : 'flex-end' , flex : 1 , justifyContent : 'flex-end' }}>
                <View style={appendStyle.innerContainer}>
                    <Para>{message}</Para>
                    <Para size={13} style={appendStyle.time}>{toFarsiNumber(time)}</Para>
                </View>
                </View>
        </View>
    )
}


const style = ({ baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-end',
        width: "100%",
        marginVertical : 25,
        paddingRight : '5%'
    },
    time : {
        position: 'absolute',
        bottom: -30,
        color: 'grey',
    },
    innerContainer : {
        backgroundColor : "#f4f6fa",
        maxWidth : "78%",
        padding: 15,
        borderRadius : baseBorderRadius,
        borderTopRightRadius : 0,
        flexDirection : "row"
    },
    
})

export default AdminMessage;