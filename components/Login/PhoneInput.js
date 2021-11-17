import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../../utils';

const PhoneInput = ({ value = '' , changeHandler }) => {
    const appendStyle = useStyle(phoneInputStyle);
    return (
        <View style={appendStyle.container}>
            <TextInput
                maxLength={11}
                autoFocus
                keyboardType="numeric"
                style={appendStyle.input}
                placeholder="شماره همراه"
                value={value}
                onChangeText={changeHandler}
            />
        </View>
    )
}


const phoneInputStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        borderWidth : 2,
        borderColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        marginVertical : 10
    },
    input : {
        fontSize : 22,
        fontFamily : "bold",
        padding: 15,
        textAlign : 'center'
    }
})


export default PhoneInput;