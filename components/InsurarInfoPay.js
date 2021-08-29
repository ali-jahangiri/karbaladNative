import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';

import { Feather } from '@expo/vector-icons';
import Para from './Para';
import { generateColor, toFarsiNumber } from '../utils';

const InsurerInfoPay = ({ birthDay , genders , nCode , mobile, name , family}) => {
    const appendStyle = useStyle(style);
    const gender = !genders ? "مرد" : "زن";
    return (
        <View style={appendStyle.container}> 
            <View style={appendStyle.header}>
                <Para size={18} weight="bold">مشخصات بیمه‌گذار</Para>
                <View style={appendStyle.negativeIcon}>
                    <Feather name="user" size={24} style={appendStyle.icon} />
                </View>
            </View>
            <View style={appendStyle.itemsContainer}>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{`${name} ${family}`}</Para>
                    <Para style={appendStyle.label}>نام و نام‌خانوادگی</Para>
                </View>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{toFarsiNumber(mobile)}</Para>
                    <Para style={appendStyle.label}>شماره همراه</Para>
                </View>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{toFarsiNumber(nCode)}</Para>
                    <Para style={appendStyle.label}>کد‌ملی</Para>
                </View>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{gender}</Para>
                    <Para style={appendStyle.label}>جنسیت</Para>
                </View>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{toFarsiNumber(birthDay)}</Para>
                    <Para style={appendStyle.label}>تاریخ تولد</Para>
                </View>
            </View>
        </View>
    )
}

const style = ({ primary , baseBorderRadius}) => StyleSheet.create({
    container : {
        marginTop : 10
    },
    header : {
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'flex-end',
        marginBottom : 10
    },
    itemsContainer : {
        width : "90%",
        marginHorizontal : "5%"
    },
    icon : {
        color: primary
    },
    label : {
        color: "grey"
    },
    value : {
        fontSize : 16
    },
    negativeIcon : {
        backgroundColor : generateColor(primary , 5),
        borderTopLeftRadius : baseBorderRadius,
        borderBottomLeftRadius : baseBorderRadius,
        padding: 15,
        paddingLeft : 20,
        marginLeft : 10
    },
    row : {
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : "center",
        marginVertical : 10
    }
})

export default InsurerInfoPay;