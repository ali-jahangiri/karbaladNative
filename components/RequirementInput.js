import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';

import client from '../client';

const { requirementInputBorderColorError , requirementInputBorderColorErrorOnFocous } = client.style.colors

const RequirementInput = ({ onChange , store , label , formName , keyboardType = 'default' , defaultValue , haveError , maxLength }) => {
    const appendStyle = useStyle(style , haveError);
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef();
    const isActive = isFocused || store?.[formName] || defaultValue

    return (
        <View style={[appendStyle.item , {marginTop : isActive ? 40 : 10}]}>
                        <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
                            <Para color={isActive ? "black" : "grey"} style={{...appendStyle.inputLabel , ...{top : isActive  ? -15 : 20 }}}>{label}</Para>
                        </TouchableWithoutFeedback>
                        <TextInput
                            maxLength={maxLength || null}
                            ref={inputRef}
                            defaultValue={defaultValue || ''}
                            keyboardType={keyboardType}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(null)}
                            style={[appendStyle.input , isFocused ? appendStyle.focusedInput : {}]}
                            value={store?.[formName]}
                            onChangeText={value => onChange(formName , value)} />
        </View>
    )
}


const style = ({ primary , baseBorderRadius } , haveError) => StyleSheet.create({
    item : {
        height : 65,
        marginVertical : 10
    },
    inputLabel : {
        position: "absolute",
        right: 10,
        zIndex : 2,
        backgroundColor : "white" , top : -15 , 
        paddingHorizontal : 10 , 
        zIndex : 555
    },  
    focusedInput : {
        borderColor : haveError ? requirementInputBorderColorErrorOnFocous :  generateColor(primary , 8)
    },
    input : {
        paddingHorizontal : 10,
        height : "100%",
        borderWidth : 2,
        borderColor : haveError ? requirementInputBorderColorError : generateColor(primary, 3),
        fontSize : 14,
        borderRadius : baseBorderRadius,
        fontFamily : 'bold',
        zIndex : 5,
        backgroundColor : "white"
    },
})

export default RequirementInput;