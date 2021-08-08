import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import DatePicker from '../DatePicker';
import Para from '../Para';


const ReminderDatePicker = ({ value , setValue }) => {
    const appendedStyle = useStyle(style);


    const targetYear = dayjs().calendar("jalali").locale("fa").year();
    
    
    return (
        <View style={[appendedStyle.container , { marginHorizontal : 20 }]}>
            <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'flex-end' , marginVertical : 15 }}>
                <Para color="grey" size={17} weight="bold">تاریخ یادآوری</Para>
                <View style={appendedStyle.bullet} />
            </View>
            <DatePicker
                    absoluteValue
                    yearList={[...Array(50).keys()].map((_ , i) => targetYear + i)} 
                    date={value} 
                    onChange={({ value }) => setValue(value)} />
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        marginVertical : 15,
    },
    input : {
        fontFamily : "bold",
        color: 'grey',
        minHeight : 70,
    },
    bullet : {
        width : 25,
        height:  25,
        borderRadius : baseBorderRadius - 5,
        backgroundColor : generateColor(primary , 5),
        marginLeft : 15
    },
})

export default ReminderDatePicker;