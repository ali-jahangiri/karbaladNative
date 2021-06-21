import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, numberSeparator } from '../utils';
import Para from './Para';

import { Feather } from '@expo/vector-icons';

const InstallmentItem = ({ title , details , insuranceInstallmentPrice , onSelect , id , pishPercent , ghestCount , stepMount , isLastItem }) => {
    const appendStyle = useStyle(style , isLastItem);
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <Para weight="bold" size={16}>{title}</Para>
                <View style={appendStyle.headerIcon}>
                    <Feather name="file" size={24} style={appendStyle.headerIconSvg} />
                </View>
            </View>
            <View style={appendStyle.values}>
                <View style={appendStyle.row}>
                    <View style={appendStyle.priceUnit}>
                        <Para style={{ marginRight : 10 }} color="grey">تومان</Para>
                        <Para style={appendStyle.value}>{numberSeparator((insuranceInstallmentPrice * pishPercent) / 100)}</Para>
                    </View>
                    <Para style={appendStyle.label}>پیش پرداخت</Para>
                </View>
                <View style={appendStyle.row}>
                    <View style={appendStyle.priceUnit}>
                        <Para style={{ marginRight : 10 }} color="grey">تومان</Para>
                        <Para style={appendStyle.value}>{numberSeparator(Math.ceil((insuranceInstallmentPrice - ((insuranceInstallmentPrice * pishPercent) / 100)) / ghestCount))}</Para>
                    </View>
                    <Para style={appendStyle.label}>مبلغ هر قسط</Para>
                </View>
                <View style={appendStyle.row}>
                    <View style={appendStyle.priceUnit}>
                        <Para style={{ marginRight : 10 }} color="grey">ماه</Para>
                        <Para style={appendStyle.value}>{stepMount}</Para>
                    </View>
                    <Para style={appendStyle.label}>فاصله بین هر قسط</Para>
                </View>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{ghestCount}</Para>
                    <Para style={appendStyle.label}>تعداد قسط </Para>
                </View>
            </View>
            <View style={appendStyle.details}>
                <Para color="grey">جزئیات</Para>
                <Para size={15}>{details}</Para>
            </View>
            
            <TouchableOpacity onPress={() => onSelect(id)} style={appendStyle.ctaContainer}>
                <Feather style={{ marginRight : 5 }} name="chevron-left" size={24} color="black" />
                <Para weight="bold" align='center'>انتخاب طرح</Para>
            </TouchableOpacity>
            {
                !isLastItem ? <View style={appendStyle.divider} /> : null
            }
        </View>
    )
}

const style = ({ primary , baseBorderRadius , secondary } , isLastItem) => StyleSheet.create({
    container : {
        width: "90%",
        marginHorizontal : "5%",
        marginBottom : isLastItem ? 10 : 0
    },
    header : {
        flexDirection : "row",
        justifyContent : 'flex-end',
        alignItems :"center"
    },
    headerIcon : {
        backgroundColor : generateColor(primary , 2),
        padding: 15,
        borderRadius : baseBorderRadius,
        marginLeft : 10
    },  
    divider : {
        width: "80%",
        height : 3,
        marginHorizontal : "10%",
        backgroundColor : secondary,
        marginTop : 30,
        marginBottom : 30,
        borderRadius : baseBorderRadius
    }, 
    headerIconSvg : {
        color: generateColor(primary , 5)
    },  
    ctaContainer : {
        padding: 15,
        backgroundColor : generateColor(primary , 8),
        borderRadius : baseBorderRadius,
        flexDirection : "row",
        justifyContent : "center"
    },
    details : {
        marginVertical : 10
    },
    label : {
        fontSize : 15,
        color: "grey"
    },
    value : {
        fontSize : 17,
        fontWeight : "bold"
    },
    row : {
        flexDirection : "row",
        justifyContent : 'space-between',
        marginVertical : 10
    },
    priceUnit : {
        flexDirection : "row",
        alignItems : "center",
    }
})

export default InstallmentItem;