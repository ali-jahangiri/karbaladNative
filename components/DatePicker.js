import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';
import Para from './Para';


import { persianDate } from '../utils';

const DatePicker = ({ date = persianDate.dateInstance,  onChange}) => {
    
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    useEffect(() => {
        const initialDate = persianDate.stringDateToObject(date);
        onChange({ value : `${initialDate.year}/${initialDate.month}/${initialDate.day}`});
    } , []);

    const internalStateHandler = ({ key , value }) => {
        const oldDate = persianDate.stringDateToObject(date);
        const newDate = {...oldDate , [key] : value};
        onChange({ value : `${newDate.year}/${newDate.month}/${newDate.day}`});
    }

    const yearRef = useRef()
    const monthRef = useRef()
    const dayRef = useRef()
    
    const { year , month , day } = persianDate.stringDateToObject(date);
    useEffect(() => {
        yearRef.current.scrollTo({
            y : persianDate.year.findIndex(el => el === year) * 70
        })
        monthRef.current.scrollTo({
            y : (persianDate.month.findIndex(el => el === month) - 1) * 70
        })
        dayRef.current.scrollTo({
            y : (persianDate.day.findIndex(el => el === day) - 1) * 70
        })

    } , [date]);



    return (
        <View style={{ flex : 1 ,alignItems  : 'center' , justifyContent : 'center'}}>
        <View style={appendStyle.container}>
            <ScrollView ref={yearRef} style={appendStyle.column}>
                {
                        persianDate.year.map((el , i) => (
                            <TouchableOpacity style={{ height : 70 }} onPress={() => internalStateHandler({ key :  'year' , value : el})} key={i}>
                                <View style={[year === el && appendStyle.selectedItem , appendStyle.item ]}>
                                    <Para align="center" weight="bold" size={20} color={year === el ? primary : "grey"} >{toFarsiNumber(el)}</Para>
                                </View>
                            </TouchableOpacity>
                        ))
                }
            </ScrollView>
            <ScrollView ref={monthRef} style={[appendStyle.middleColumn , appendStyle.column]} >
                {
                    persianDate.month.slice(1).map((el , i) => (
                        <TouchableOpacity style={{ height : 70 }} onPress={() => internalStateHandler({ key :  'month' , value : el})} key={i}>
                            <View style={[month === el && appendStyle.selectedItem , appendStyle.item]}>
                                <Para align="center" weight="bold" size={20} color={month === el ? primary : "grey"} >{toFarsiNumber(el)}</Para>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <ScrollView  ref={dayRef} style={appendStyle.column}>
                {persianDate.day.slice(1).map((el , i) => (
                        <TouchableOpacity style={{ height : 70 }}  onPress={() => internalStateHandler({ key :  'day' , value : el})} key={i}>
                            <View  style={[day === el && appendStyle.selectedItem , appendStyle.item]}>
                                <Para align="center" weight="bold" size={20} color={day === el ? primary : "grey"} >{toFarsiNumber(el)}</Para>
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
    middleColumn : {
        borderColor : generateColor(primary , 1),
        borderLeftWidth : 2,
        borderRightWidth : 2
    },
    selectedItem : {
        backgroundColor : generateColor(primary , 3),
        marginHorizontal : '15%',
        borderRadius : baseBorderRadius,
    },
    column : {
        width: percentagedWith,
        flexGrow : 0,
        flexShrink : 0,
        marginVertical : 10   
    },
    item : {
        height: "100%",
        alignItems : 'center',
        justifyContent : 'center'
    }
})

export default DatePicker;