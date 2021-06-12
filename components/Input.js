import React from 'react';
import  { StyleSheet, TextInput } from "react-native"



const Input = ({ value , changeHandler , placeholder }) => {

    return (
        <TextInput 
            value={value}
            placeholder={placeholder}
            onChangeText={changeHandler} />
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    input : {
        
    }
})

export default Input;