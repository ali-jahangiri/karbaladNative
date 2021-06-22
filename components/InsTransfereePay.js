import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { toFarsiNumber } from '../utils';
import Para from './Para';


const InsTransfereePay = ({ reciverFamily ,reciverMobile , reciverName , reciverPhone , areasFullName , exactAddress }) => {
    const appendStyle = useStyle(style);
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <Para size={18} weight="bold">مشخصات تحویل گیرنده</Para>
                <Feather style={{ marginLeft : 10 }} name="user-check" size={24} color="black" />
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


const style = () => StyleSheet.create({
    
    container : {
        marginTop : 20
    },
    header : {
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'flex-end',
        marginBottom : 10
    },
    itemsContainer : {
        paddingHorizontal : 5
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