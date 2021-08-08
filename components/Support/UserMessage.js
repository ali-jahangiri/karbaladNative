import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../../utils';
import Para from '../Para';



const UserMessage = ({ message , time }) => {
    const appendStyle = useStyle(style);
    return (
        <View style={appendStyle.container}>
            <View style={{ flexDirection : 'row' , alignContent : 'flex-end' , flex : 1 , justifyContent : 'flex-start' }}>
                <View style={appendStyle.innerContainer}>
                    <Para>{message}</Para>
                    <Para size={13} style={appendStyle.time}>{toFarsiNumber(time)}</Para>
                </View>
                </View>
        </View>   
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-end',
        width: "100%",
        marginVertical : 25,
        paddingLeft : '5%'
    },
    time : {
        position: 'absolute',
        bottom: -30,
        right: 0,
        color: 'grey',
    },
    innerContainer : {
        backgroundColor : generateColor(primary, 5),
        maxWidth : "78%",
        padding: 15,
        borderRadius : baseBorderRadius,
        borderTopLeftRadius : 0,
        flexDirection : "row"
    },
})

export default UserMessage;