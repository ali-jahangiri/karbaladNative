import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder, toFarsiNumber } from '../utils';
import Para from './Para';

import InsResultMoreDetails from './InsResultPreviewMoreDetails';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';



const InsuranceResultPreviewItem = ({ insName , factorItems , insIconUrl , formulId , catFullName , showValue , tavangariMali , tedadeShoabKhesarat , rezayatAzMablaghPardakhti , outInsurance : moreDetailsValue ,  installmentList , reqId , installment_Value , visualAlert  , haveInstallment}) => {
    const appendStyle = useStyle(style , haveInstallment);
    const { primary } = useStyle();
    const [moreDetailsActive, setMoreDetailsActive] = useState(false);

    const navigation = useNavigation();
    

    const orderHandler = () => {
        navigation.push('insuranceConfirm' , { formulId , factorItems , insModel : { name : insName , icon : insIconUrl , category: catFullName , price : showValue ,  } , haveInstallment : installmentList.find(el => el === formulId) , reqId , installment_Value } )
    }


    let moreDetailList = [
        {
            label : "سطح توانگری",
            value : tavangariMali
        },
        {
            label : "رضایت مشتری",
            value : rezayatAzMablaghPardakhti
        },
        {
            label : <>
                        <Para>تعداد شعب</Para>   
                        <Para>پرداخت خسارت</Para>   
                    </>,
            value : tedadeShoabKhesarat
        },
    ];


    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                {
                    haveInstallment ? <View style={appendStyle.percentageContainer}>
                        <Feather name="percent" size={16} color={primary} />
                        <Para size={12} color={primary}>قسطی</Para>
                    </View> : null
                }
                <View style={{ flexDirection : "row" }}>
                    <View style={{ marginRight : 10 , justifyContent : 'center'}}>
                        <Para size={18}>{insName}</Para>
                        {
                            visualAlert ? <Para color="grey">{visualAlert}</Para> : null
                        }
                    </View>
                    <Image resizeMode="center" source={{
                        uri : imageFinder(insIconUrl),
                        width : 60,
                        height: 60
                    }} />
                </View>
            </View>
            <View style={appendStyle.ctaContainer}>
                <View style={appendStyle.price}>
                    <Para size={10} color="grey" style={{ marginRight : 5 }}>تومان</Para>
                    <Para size={18} weight="bold">{toFarsiNumber(showValue)}</Para>
                </View>
                <TouchableOpacity style={appendStyle.cta} onPress={orderHandler}>
                    <Para align="center" weight="bold">سفارش</Para>
                </TouchableOpacity>
            </View>
            
                <InsResultMoreDetails
                    mainMoreDerails={moreDetailList.filter(el => el.value)}
                    visible={moreDetailsActive} 
                    setVisibility={setMoreDetailsActive}
                    data={moreDetailsValue} />
            <View style={appendStyle.divider} />
        </View>
    )
}

const style = ({ primary , baseBorderRadius , secondary } , haveInstallment) => StyleSheet.create({
    container : {
        width: "90%",
        marginHorizontal : '5%',
        marginTop : 10
    },
    ctaContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'flex-end',
        marginTop : 20
    },

    cta : {
        backgroundColor : generateColor(primary , 8),
        borderRadius : baseBorderRadius,
        padding : 15,
        flex : 1
    },
    price : {
        flexDirection : 'row',
        alignItems : 'center',
        flex: 1,
    },
    percentageContainer : {
        alignItems : 'center',
        backgroundColor : generateColor(primary , 1),
        borderRadius : baseBorderRadius,
        padding : 10,
    },
    percentIcon : {
        color: primary,
    },  
    header : {
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : haveInstallment ? "space-between" : "flex-end",
    },
    divider : {
        backgroundColor : generateColor(secondary , 6) ,
        width: "98%",
        height: 2,
        marginHorizontal : "1%",
        marginBottom : 10,
        borderRadius : baseBorderRadius
    }
})

export default InsuranceResultPreviewItem;