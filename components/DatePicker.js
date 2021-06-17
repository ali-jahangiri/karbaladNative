import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';


import { persianDate } from '../utils';

const DatePicker = ({ date = persianDate.dateInstance,  onChange}) => {
    
    const appendStyle = useStyle(style);
    useEffect(() => {
        const initialDate = persianDate.stringDateToObject(date);
        onChange({ value : `${initialDate.year}/${initialDate.month}/${initialDate.day}`});
    } , [])
    const internalStateHandler = ({ key , value }) => {
        const oldDate = persianDate.stringDateToObject(date);
        const newDate = {...oldDate , [key] : value};
        onChange({ value : `${newDate.year}/${newDate.month}/${newDate.day}`});
    }

    return (
        <View style={{ flex : 1 ,alignItems  : 'center' , justifyContent : 'center'}}>
        <View style={appendStyle.container}>
            <ScrollView style={appendStyle.column}>
                {
                        persianDate.year.map((el , i) => (
                            <TouchableOpacity  onPress={() => internalStateHandler({ key :  'year' , value : el})} key={i}>
                                <View style={[persianDate.stringDateToObject(date).year === el && appendStyle.selectedItem , appendStyle.item ]}>
                                    <Para  align="center" weight="bold" size={20} color="grey" >{el}</Para>
                                </View>
                            </TouchableOpacity>
                        ))
                }
            </ScrollView>
            <ScrollView style={[appendStyle.middleColumn , appendStyle.column]} >
                {
                    persianDate.month.slice(1).map((el , i) => (
                        <TouchableOpacity  onPress={() => internalStateHandler({ key :  'month' , value : el})} key={i}>
                            <View style={[persianDate.stringDateToObject(date).month === el && appendStyle.selectedItem , appendStyle.item]}>
                                <Para align="center" weight="bold" size={20} color="grey" >{el}</Para>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <ScrollView style={appendStyle.column}>
                {
                    persianDate.day.slice(1).map((el , i) => (
                        <TouchableOpacity  onPress={() => internalStateHandler({ key :  'day' , value : el})} key={i}>
                            <View style={[persianDate.stringDateToObject(date).day === el && appendStyle.selectedItem , appendStyle.item]}>
                                <Para align="center" weight="bold" size={20} color="grey" >{el}</Para>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
        </View>
    )
}

const percentagedWith = "33%";

const style = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {
        height: 220,
        flexDirection : "row",
    },
    yearContainer : {

    },
    middleColumn : {
        borderColor : generateColor(primary , 2),
        borderLeftWidth : 2,
        borderRightWidth : 2
    },
    selectedItem : {
        backgroundColor : generateColor(primary , 3),
        width: "70%",
        marginHorizontal : '15%',
        borderRadius : baseBorderRadius,
        // padding: 10
    },
    column : {
        // flex: 1,
        width: percentagedWith,
        flexGrow : 0,
        flexShrink : 0,
        marginVertical : 10   
    },
    item : {
        height: 60,
        alignItems : 'center',
        justifyContent : 'center'
    }
})

export default DatePicker;