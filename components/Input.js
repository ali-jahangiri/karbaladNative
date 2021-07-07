import React from 'react';
import  { StyleSheet, TextInput, View } from "react-native"
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';

const Input = ({ value , changeHandler , placeholder , isPassword , align , extendInputStyle , isMultiLine = false }) => {
    const appendStyle = useStyle(style , align );

    return (
        <View style={appendStyle.container}>
            <TextInput
                multiline={isMultiLine}
                secureTextEntry={isPassword}
                style={[appendStyle.input , extendInputStyle]}
                value={value}
                placeholder={placeholder}
                onChangeText={changeHandler} />
        </View>
    )
}

const style = ({ primary , baseBorderRadius } , align) => StyleSheet.create({
    container : {
        borderRadius : baseBorderRadius,
        borderColor : generateColor(primary , 5),
        borderWidth : 2,
        marginVertical : 10
    },  
    input : {
        padding: 15,
        fontFamily : "bold",
        textAlign : align,
    }
})

export default Input;