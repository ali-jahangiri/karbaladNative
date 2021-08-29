import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, TouchableOpacity, View  } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import {  numberSeparator, toFarsiNumber } from '../utils';
import Para from './Para';

import { Feather } from '@expo/vector-icons';

import InputNumber from "./InputNumber";
import useFetch from '../Providers/useFetch';
import client from '../client';

const { fadeBg_1 , fadeBg_2 } = client.style.colors

const { ORDER_TEXT , IN_REDIRECTION , REMAIN_TEXT  , ADD_TO_WALLET_TEXT} = client.static.WALLET_CARD;

const WalletCart = ({ finalResult = "" , paymentProcessHandler , isInPaymentProcess , setTransactionStatus }) => {
    const appendStyle = useStyle(style);
    const [chargeAmountPrice, setChargeAmountPrice] = useState(1000);
    const [chargeViewActive, setChargeViewActive] = useState(false);

    
    const fetcher = useFetch();


    const resetHandler = () => {
        setChargeAmountPrice(1000);
        setChargeViewActive(false);
        paymentProcessHandler(false);
    }

    
    const wentWrongHandler = () => {
        Alert.alert("ارتباط برقرار نشد" , "خطا در ارسال به مرورگر. مجدد تلاش نمایید" ,
        [{
                onPress : () => {},
                text : "تایید"
        }])
    }



    const redirectToWebPay = () => {
        paymentProcessHandler(true);
        fetcher('UserAddWallet' , { addAmount : chargeAmountPrice })
            .then(({ data }) => {
                if(!data.url) {
                    setTransactionStatus({ message : 'مشکلی از سمت درگاه پرداخت رخ داده است . مجددا تلاش نمایید'})
                    resetHandler()
                }else {
                    Linking.openURL(data.url)
                        .then(_ => resetHandler())
                        .catch(err => {
                            wentWrongHandler(err);
                        }) 
                }
            })
    }

    return (
        <View style={appendStyle.container}>
            {
                !chargeViewActive ? <>
                    <View style={appendStyle.firstPart}>
                    <TouchableOpacity onPress={() => setChargeViewActive(prev => !prev)} style={appendStyle.chargeCta}>
                        <Feather style={{ marginRight : 5 }} name="plus" size={24} color="black" />
                        <Para weight='bold'>{ADD_TO_WALLET_TEXT}</Para>
                    </TouchableOpacity>
                    <View style={appendStyle.creditIconContainer}>
                        <Feather name="credit-card" size={24} style={appendStyle.creditIcon} />
                    </View>
                </View>
                <View style={appendStyle.lastTransaction}>
                    <View style={appendStyle.amount}>
                        <Para style={{ marginRight : 5 }}>تومان</Para>
                        <Para size={22} weight="bold">{numberSeparator(toFarsiNumber(finalResult))}</Para>
                    </View>
                    <Para size={18} weight="bold">{REMAIN_TEXT}</Para>
                </View>
                </> : <View style={appendStyle.chargeView}>
                    <TouchableOpacity style={[appendStyle.chargeCta , { alignSelf : "flex-start", marginLeft : 20 , marginTop : 10 }]} onPress={resetHandler}>
                        <Feather style={{ marginRight : 5 }} name="arrow-left" size={24} color="black" />
                        <Para  weight="bold">بازگشت</Para>
                    </TouchableOpacity>
                    <View style={{ flexDirection : "row" , padding : 20 }}>
                        <InputNumber
                                triggersStyle={{ backgroundColor : fadeBg_1 }}
                                    length={{ min : 10000 , max : 100000000 }}
                                    onChange={({ value }) => setChargeAmountPrice(value)}
                                    value={chargeAmountPrice}
                                    />
                    </View>
                    <TouchableOpacity disabled={isInPaymentProcess} style={[appendStyle.payCta , isInPaymentProcess ? appendStyle.disabledCta : {}]} onPress={redirectToWebPay}>
                        <Feather style={{ marginRight : 10 }} name="check" size={24} color="black" />
                        <Para size={16} weight="bold">{
                            isInPaymentProcess ? IN_REDIRECTION : ORDER_TEXT
                        }</Para>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        backgroundColor : primary,
        borderRadius : baseBorderRadius,
        width: "90%",
        marginHorizontal : "5%",
        overflow: "hidden",
        height : 230,
        justifyContent : 'space-between',
        marginBottom : 10,
        marginTop : 10
    },
    lastTransaction : {
        backgroundColor : fadeBg_1,
        padding: 20,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    amount : {
        flexDirection  :'row',
        alignItems : "center"
    },
    disabledCta : {
        opacity: .5
    },
    chargeCta : {
        padding : 15,
        backgroundColor : fadeBg_1,
        borderRadius : baseBorderRadius,
        flexDirection : "row",

    },
    firstPart : {
        flexDirection : "row",
        justifyContent : "space-between",
        padding: 20
    },
    creditIconContainer : {
        backgroundColor : fadeBg_1,
        padding: 15,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : baseBorderRadius
    },
    creditIcon : {
        color: primary
    },
    payCta : {
        flexDirection : "row",
        justifyContent : 'center',
        backgroundColor : fadeBg_2,
        padding : 15
    },
    chargeView : {
        justifyContent : "space-between",
        height : "100%"
    }
})

export default WalletCart;