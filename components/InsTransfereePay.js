import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';
import Para from './Para';


const InsTransfereePay = ({ reciverFamily ,reciverMobile , reciverName , reciverPhone , areasFullName , exactAddress }) => {
    const appendStyle = useStyle(style);
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <Para size={18} weight="bold">مشخصات تحویل گیرنده</Para>
                <View style={appendStyle.negativeIcon}>
                    <Feather style={{ marginLeft : 10 }} name="user-check" size={24} style={appendStyle.icon} />
                </View>
            </View>
            <View style={appendStyle.itemsContainer}>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{`${reciverName} ${reciverFamily}`}</Para>
                    <Para style={appendStyle.label}>نام و نام‌خانوادگی </Para>
                </View>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{areasFullName}</Para>
                    <Para style={appendStyle.label}>منطقه</Para>
                </View>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{toFarsiNumber(reciverPhone)}</Para>
                    <Para style={appendStyle.label}>شماره تلفن</Para>
                </View>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{toFarsiNumber(reciverMobile)}</Para>
                    <Para style={appendStyle.label}>شماره همراه</Para>
                </View>
                <View style={appendStyle.row}>
                    <Para style={appendStyle.value}>{exactAddress}</Para>
                    <Para style={appendStyle.label}>آدرس</Para>
                </View>
            </View>
        </View>
    )
}


const style = ({ primary , baseBorderRadius}) => StyleSheet.create({
    container : {
        marginTop : 20
    },
    icon : {
        color: primary
    },
    negativeIcon : {
        backgroundColor : generateColor(primary , 5),
        borderTopLeftRadius : baseBorderRadius,
        borderBottomLeftRadius : baseBorderRadius,
        padding: 15,
        paddingLeft : 20,
        marginLeft : 10
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
    label : {
        color: "grey"
    },
    value : {
        fontSize : 16
    },
    row : {
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : "center",
        marginVertical : 10
    }
})

export default InsTransfereePay;