import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, numberSeparator, toFarsiNumber } from '../utils';
import Para from './Para';

import { Feather } from '@expo/vector-icons';
import client from '../client';
import Btn from './Btn';

const { ORDER_TEXT } = client.static.INSTALLMENT

const InstallmentItem = ({ title , details , insuranceInstallmentPrice , onSelect , id , pishPercent , ghestCount , stepMount , isLastItem }) => {
    const appendStyle = useStyle(style , isLastItem);

    const price = Math.ceil((insuranceInstallmentPrice - ((insuranceInstallmentPrice * pishPercent) / 100)) / ghestCount);
    const prepayment = (insuranceInstallmentPrice * pishPercent) / 100;
    
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
                            {
                                prepayment ? <><Para style={{ marginRight : 5 }} color="grey">تومان</Para>
                                <Para weight="bold" style={appendStyle.value}>{toFarsiNumber(numberSeparator(prepayment))}</Para></> : <Para>ندارد</Para>
                            }
                            
                        </View>
                        <Para style={appendStyle.label}>پیش پرداخت</Para>
                    </View>
                <View style={appendStyle.row}>
                    <View style={appendStyle.priceUnit}>
                        <Para style={{ marginRight : 5 }} color="grey">تومان</Para>
                        <Para weight="bold" style={appendStyle.value}>{toFarsiNumber(numberSeparator(price))}</Para>
                    </View>
                    <Para style={appendStyle.label}>مبلغ هر قسط</Para>
                </View>
                <View style={appendStyle.row}>
                    <View style={appendStyle.priceUnit}>
                        <Para style={{ marginRight : 5 }} color="grey">ماه</Para>
                        <Para style={appendStyle.value}>{toFarsiNumber(stepMount)}</Para>
                    </View>
                    <Para style={appendStyle.label}>فاصله بین هر قسط</Para>
                </View>
                {
                    ghestCount ? <View style={appendStyle.row}>
                        <Para style={appendStyle.value}>{toFarsiNumber(ghestCount)}</Para>
                        <Para style={appendStyle.label}>تعداد قسط </Para>
                    </View> : null
                }
                
            </View>
            <View style={appendStyle.details}>
                <Para color="grey">جزئیات</Para>
                <Para size={15}>{details}</Para>
            </View>

            <Btn title={ORDER_TEXT} icon="chevron-left" onPress={() => onSelect(id)} />
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
        marginBottom : isLastItem ? 10 : 0,
        backgroundColor : generateColor(primary , 1),
        padding: 20,
        borderRadius : baseBorderRadius
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
    details : {
        marginVertical : 10
    },
    label : {
        fontSize : 15,
        color: "grey"
    },
    value : {
        fontSize : 17,
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