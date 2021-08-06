import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';

import { Feather } from '@expo/vector-icons';


const PasswordInput = ({ value , changeHandler , placeholder , autoFocus = false , eyeEnable , fontSize }) => {
    const appendStyle = useStyle(passwordInputStyle , fontSize);
    const [passInVisible, setPassInVisible] = useState(true);
    
    return (
        <View style={appendStyle.container}>
            {
                eyeEnable && <TouchableOpacity onPress={() => setPassInVisible(prev => !prev)} style={appendStyle.passVisible}>
                    <Feather style={appendStyle.eyeIcon} name={`${passInVisible ? "eye" : "eye-off"}`} size={24} color="black" />
                </TouchableOpacity>
            }
            <View style={appendStyle.inputContainer}>
                <TextInput
                    autoFocus={autoFocus}
                    style={appendStyle.input}
                    placeholder={placeholder}
                    secureTextEntry={passInVisible}
                    value={value}
                    onChangeText={changeHandler}
                />
            </View>
        </View>
    )
}

const passwordInputStyle = ({ primary , baseBorderRadius } , fontSize) => StyleSheet.create({
    container : {
        borderColor : generateColor(primary , 5) , 
        borderWidth : 2,
        borderRadius : baseBorderRadius,
        marginVertical : 10,
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    input : {
        fontSize : fontSize || 20,
        padding: 15,
        fontFamily : "bold",
    },
    inputContainer : {
        flex : 1.7,
    },
    passVisible : {
        justifyContent : "center",
        alignItems : 'center',
        flex: .3
    },
    eyeIcon : {
        color: primary
    }
})


export default PasswordInput;