import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';
import Para from './Para';


import { persianDate } from '../utils';

const DatePicker = ({ date = persianDate.dateInstance,  onChange , yearList , absoluteValue = false }) => {
    
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    useEffect(() => {
        const initialDate = persianDate.stringDateToObject(date);
        onChange({ value : `${initialDate.year}/${absoluteValueHelper(initialDate.month)}/${absoluteValueHelper(initialDate.day)}`});
    } , []);

    const internalStateHandler = ({ key , value }) => {
        const oldDate = persianDate.stringDateToObject(date);
        const newDate = {...oldDate , [key] : value};
        onChange({ value : `${newDate.year}/${absoluteValueHelper(newDate.month)}/${absoluteValueHelper(newDate.day)}`});
    }

    const yearRef = useRef()
    const monthRef = useRef()
    const dayRef = useRef()
    
    const { year , month , day } = persianDate.stringDateToObject(date);
    useEffect(() => {
        yearRef.current.scrollTo({
            y : conditionalYear.findIndex(el => el === year) * 70
        })
        monthRef.current.scrollTo({
            y : (persianDate.month.findIndex(el => el === month) - 1) * 70
        })
        dayRef.current.scrollTo({
            y : (persianDate.day.findIndex(el => el === day) - 1) * 70
        })

    } , [date]);


    const conditionalYear = yearList || persianDate.year


    const absoluteValueHelper = value => {
        if(absoluteValue) {
            if(Number(value) < 10) {
                return `0${value}`
            }else return value
        }else return value
    }


    const absoluteValueReturn = value => Number(value)

    return (
        <View style={{ flex : 1 ,alignItems  : 'center' , justifyContent : 'center'}}>
        <View style={appendStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} nestedScrollEnabled ref={yearRef} style={appendStyle.column}>
                {
                        conditionalYear.map((el , i) => (
                            <TouchableOpacity style={{ height : 70 }} onPress={() => internalStateHandler({ key :  'year' , value : el})} key={i}>
                                <View style={[year === absoluteValueReturn(el) && appendStyle.selectedItem , appendStyle.item ]}>
                                    <Para align="center" weight="bold" size={20} color={year === absoluteValueReturn(el) ? primary : "grey"} >{toFarsiNumber(absoluteValueReturn(el))}</Para>
                                </View>
                            </TouchableOpacity>
                        ))
                }
            </ScrollView>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} nestedScrollEnabled ref={monthRef} style={[appendStyle.middleColumn , appendStyle.column]} >
                {
                    persianDate.month.slice(1).map((el , i) => (
                        <TouchableOpacity style={{ height : 70 }} onPress={() => internalStateHandler({ key :  'month' , value : el})} key={i}>
                            <View style={[month === absoluteValueReturn(el) && appendStyle.selectedItem , appendStyle.item]}>
                                <Para align="center" weight="bold" size={20} color={month === absoluteValueReturn(el) ? primary : "grey"} >{toFarsiNumber(absoluteValueReturn(el))}</Para>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} nestedScrollEnabled ref={dayRef} style={appendStyle.column}>
                {persianDate.day.slice(1).map((el , i) => (
                        <TouchableOpacity style={{ height : 70 }}  onPress={() => internalStateHandler({ key :  'day' , value : el})} key={i}>
                            <View  style={[day === absoluteValueReturn(el) && appendStyle.selectedItem , appendStyle.item]}>
                                <Para align="center" weight="bold" size={20} color={day === absoluteValueReturn(el) ? primary : "grey"} >{toFarsiNumber(absoluteValueReturn(el))}</Para>
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