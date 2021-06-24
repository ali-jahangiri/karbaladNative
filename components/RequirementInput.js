import React, { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';


const RequirementInput = ({ currentActive , onChange , setCurrentActive , index , store , label , formName , keyboardType = 'default' , defaultValue }) => {
    const appendStyle = useStyle(style);
    useEffect(() => {
        if(defaultValue) {
            onChange(formName , defaultValue)
        }else {
            onChange(formName , "")
        }
    } , [defaultValue]);
    let placeholder = label
    return (
        <View style={[appendStyle.item , {marginTop : currentActive === index || store?.[formName] ? 40 : 10}]}>
                        <Para style={{...appendStyle.inputLabel , ...{top : currentActive === index || store?.[formName]  ? -30 : 10 }}}>{label}</Para>
                        <TextInput
                            defaultValue={defaultValue || ''}
                            keyboardType={keyboardType}
                            onFocus={() => setCurrentActive(index)}
                            placeholder={placeholder}
                            onBlur={() => setCurrentActive(null)}
                            style={[appendStyle.input , index === currentActive ? appendStyle.focusedInput : {}]}
                            value={store?.[formName]}
                            onChangeText={value => onChange(formName , value)} />
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    item : {
        marginVertical : 10
    },
    inputLabel : {
        position: "absolute",
        top: -30,
        right: 10,
        zIndex : 2,
    },  
    focusedInput : {
        borderColor : generateColor(primary , 8)
    },
    input : {
        borderWidth : 2,
        borderColor : generateColor(primary, 3),
        fontSize : 14,
        padding : 10,
        borderRadius : baseBorderRadius,
        fontFamily : 'bold',
        zIndex : 5,
        backgroundColor : "white"
    },
})

export default RequirementInput;