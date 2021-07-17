import React, { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, numberSeparator, toFarsiNumber } from '../utils';
import Para from './Para';

import { Feather } from '@expo/vector-icons';

import InputNumber from "./InputNumber";
import config from '../config';
import useFetch from '../Providers/useFetch';
import { useSelector } from '../Store/Y-state';

const WalletCart = ({ finalResult = "" }) => {
    const appendStyle = useStyle(style);
    const [chargeAmountPrice, setChargeAmountPrice] = useState(1000);
    const [chargeViewActive, setChargeViewActive] = useState(false);
    const privateKey = useSelector(state => state.auth.appKey);

    const [inRedirection, setInRedirection] = useState(false);


    const fetcher = useFetch(true);




    const resetAmountHandler = () => {
        setChargeAmountPrice(1000);
    }


    const wentWrongHandler = () => {
        Alert.alert("ارتباط برقرار نشد" , "خطا در ارسال به مرورگر. مجدد تلاش نمایید" ,
        [{
                onPress : () => {},
                text : "تایید"
        }])
    }


    useEffect(() => {
        
    })

    const redirectToWebPay = () => {
        setInRedirection(true);
        fetcher
            .then(({ api , appToken }) => {
                    api.post(`${config.serverPath}/MobileApi/UserAddWallet` ,
                    { addAmount : chargeAmountPrice, } ,
                    { headers : {
                        appToken , ticket : privateKey
                    } })
                    .then(({data}) => {
                        Linking.addEventListener("url" , event => {
                            console.log(event, 'er');
                        })
                        Linking.openURL(data.url)
                            .then(data => {
                                console.log(data , "then in opne");
                                setInRedirection(false);
                            })
                            .catch(err => {
                                wentWrongHandler(err);
                            })
                }).catch(err => {})
            }).catch(err => {})
        
    }

    return (
        <View style={appendStyle.container}>
            {
                !chargeViewActive ? <>
                    <View style={appendStyle.firstPart}>
                    <TouchableOpacity onPress={() => setChargeViewActive(prev => !prev)} style={appendStyle.chargeCta}>
                        <Feather style={{ marginRight : 5 }} name="plus" size={24} color="black" />
                        <Para weight='bold'>افزایش اعتبار</Para>
                    </TouchableOpacity>
                    <View style={appendStyle.creditIcon}>
                        <Feather name="credit-card" size={24} color="black" />
                    </View>
                </View>
                <View style={appendStyle.lastTransaction}>
                    <View style={appendStyle.amount}>
                        <Para style={{ marginRight : 5 }}>تومان</Para>
                        <Para size={22} weight="bold">{numberSeparator(toFarsiNumber(finalResult))}</Para>
                    </View>
                    <Para size={18} weight="bold">موجودی :</Para>
                </View>
                </> : <View style={appendStyle.chargeView}>
                    <TouchableOpacity style={[appendStyle.chargeCta , { alignSelf : "flex-start", marginLeft : 20 , marginTop : 10 }]} onPress={() => {
                        setChargeViewActive(prev => !prev)
                        resetAmountHandler()
                    }}>
                        <Feather style={{ marginRight : 5 }} name="arrow-left" size={24} color="black" />
                        <Para  weight="bold">بازگشت</Para>
                    </TouchableOpacity>
                    <View style={{ flexDirection : "row" , padding : 20 }}>
                        <InputNumber
                                    length={{ min : 10000 , max : 100000000 }}
                                    onChange={({ value }) => setChargeAmountPrice(value)}
                                    value={chargeAmountPrice}
                                    />
                    </View>
                    <TouchableOpacity style={appendStyle.payCta} onPress={redirectToWebPay}>
                        <Feather style={{ marginRight : 10 }} name="check" size={24} color="black" />
                        <Para size={16} weight="bold">{
                            inRedirection ? "در حال انتقال به درگاه" : "پرداخت"
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
    },
    lastTransaction : {
        backgroundColor : '#fff5',
        padding: 20,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    amount : {
        flexDirection  :'row',
        alignItems : "center"
    },
    chargeCta : {
        padding : 15,
        backgroundColor : "#fff5",
        borderRadius : baseBorderRadius,
        flexDirection : "row",

    },
    firstPart : {
        flexDirection : "row",
        justifyContent : "space-between",
        padding: 20
    },
    chargeIcon : {
        color: generateColor(primary , 9),
    },
    creditIcon : {
        backgroundColor : "#fff5",
        padding: 15,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : baseBorderRadius
    },
    payCta : {
        flexDirection : "row",
        justifyContent : 'center',
        backgroundColor : "#fff8",
        padding : 15
    },
    chargeView : {
        justifyContent : "space-between",
        height : "100%"
    }
})

export default WalletCart;