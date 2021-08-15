import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { imageFinder, toFarsiNumber } from '../utils';
import Para from './Para';

import dayjs from 'dayjs';



const InsDetailsPay = ({ iconUrl , id , createTime , categorysFullName , insuranceCoName }) => {
    const appendStyle = useStyle(style);
    
    const date = dayjs(createTime).calendar("jalali").locale("fa").format("YYYY/MM/DD");
    
    return (
        <View style={appendStyle.container}>
            <View style={{ justifyContent : "center" , flexDirection : "row" }}>
                <Image resizeMode="center" source={{
                    uri : imageFinder(iconUrl),
                    width: 100,
                    height: 100
                }} />
            </View>
            <View style={{ width : "90%" , marginHorizontal : "5%"}}>
                        <Para size={19} >{insuranceCoName}</Para>
                        <Para size={16}>{categorysFullName}</Para>
                <View style={appendStyle.row}>
                    <View>
                        <Para color="grey">شماره پیگیری</Para>
                        <Para size={16}>{toFarsiNumber(id)}</Para>
                    </View>
                    <View>
                        <Para color="grey">تاریخ ثبت </Para>
                        <Para size={16}>{toFarsiNumber(date)}</Para>
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = () => StyleSheet.create({
    container : {
        marginVertical : 30
    },  
    row : {
        flexDirection : "row",
        justifyContent : 'space-between',
        marginTop : 10
    }
})

export default InsDetailsPay;