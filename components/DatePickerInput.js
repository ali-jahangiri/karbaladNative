import React, { useRef, useState } from 'react';  
import { StyleSheet, TextInput, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';

import { persianDate, toFarsiNumber } from "../utils";
import { fixNumbers } from '../utils/Date';
import Para from './Para';

const DatePickerInput = ({ onChange , value = persianDate.now}) => {
    const appendStyle = useStyle(style);
    
    const yearRef = useRef()
    const monthRef = useRef();
    const dayRef = useRef();

    const inputQueue = [yearRef , monthRef , dayRef];

    const changeHandler = (unit , inputValue , length , index) => {
        
        const dateClone = persianDate.stringDateToObject(value);
        let converted = Number(fixNumbers(inputValue));
        
        const valueChecker = (() => {
            if(unit === "month") {
                if(converted > 12) return 12
                return converted
            }else if(unit === 'day') {
                if(converted > 31) return 31
                return converted
            }
            return converted
        })()

        const newDateStringed = persianDate.objectDateToString({...dateClone , [unit] : valueChecker});
        onChange(newDateStringed);
        
        if(String(converted).length === length && index < inputQueue.length - 1 ) {
            inputQueue[index + 1].current.focus();
        }
    }

    
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.column}>
                <TextInput 
                    ref={yearRef}
                    keyboardType="numeric" 
                    style={appendStyle.input} 
                    maxLength={4}
                    value={toFarsiNumber(`${persianDate.stringDateToObject(value).year}`)} 
                    onChangeText={value => changeHandler('year' , value , 4 , 0)} />
            </View>
            <View style={appendStyle.separator}>
                <Para size={25}>/</Para>
            </View>
            <View style={appendStyle.column}>
                <TextInput
                    ref={monthRef}
                    keyboardType="numeric" style={appendStyle.input} 
                    maxLength={2} 
                    value={toFarsiNumber(`${persianDate.stringDateToObject(value).month}`)} 
                    onChangeText={value => changeHandler('month' , value , 2 , 1)} />
            </View>
            <View style={appendStyle.separator}>
                <Para  size={25}>/</Para>
            </View>
            <View style={appendStyle.column}>
                <TextInput
                    ref={dayRef}  keyboardType="numeric" 
                style={appendStyle.input} 
                maxLength={2} 
                value={toFarsiNumber(`${persianDate.stringDateToObject(value).day}`)} 
                onChangeText={value => changeHandler('day' , value ,2  , 2)} />
            </View>
        </View>
    )
}

const style = () => StyleSheet.create({
    container : {
        flexDirection : "row",
        marginVertical : 30
    },
    column : {
        flex: 1
    },
    input : {
        fontSize : 18,
        textAlign : "center",
        fontFamily : "bold"
    },
    separator : {

    }
})

export default DatePickerInput;