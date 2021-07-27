import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useStyle } from '../Hooks/useStyle';
import ScreenWrapper from '../components/ScreenWrapper';

import { Feather } from '@expo/vector-icons';


import Para from '../components/Para';
import { generateColor, numberSeparator, toFarsiNumber } from '../utils';
import InsPayDeliveryOption from '../components/InsPayDeliveryOption';
import InsDetailsPay from '../components/InsDetailsPay';
import InsurerInfoPay from '../components/InsurarInfoPay';
import InsTransfereePay from '../components/InsTransfereePay';
import useFetch from '../Providers/useFetch';
import { useSelector } from '../Store/Y-state';
import Loading from '../components/Loading';
import client from '../client';
import Drawer from '../components/Drawer';

const InsurancePay = ({ navigation , route : { params : { id } } }) => {
    const [payResponse, setPayResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [additionalPrice, setAdditionalPrice] = useState(0);
    const [deliverOption, setDeliverOption] = useState(null)

    const [isInsidePaymentProcess, setIsInsidePaymentProcess] = useState(false);


    const [walletChargeLessThen, setWalletChargeLessThen] = useState(false);

    const fetcher = useFetch(false);
    
    const appendStyle = useStyle(style);
    const { primary } = useStyle();


    const navHash = useSelector(state => state.navigation.navigationHash);

    useEffect(() => {
        setLoading(true)
        fetcher("InsurancePay" , { factorId : id })
            .then(({ data }) => {
                setPayResponse(data);
                    if(data.deliveryModelsItems) {
                        setDeliverOption(data.deliveryModelsItems?.find(el => el.thisDefault).id);
                    }
                    setLoading(false)
        })
        // const unsubscribe = navigation.addListener("beforeRemove" , e => {
        //     e.preventDefault();
        //     navigation.push("home")
        //     unsubscribe()
        //     // const jumpToAction = TabActions.jumpTo('insurance', { screen : "insuranceHistoryDetails" , params : { ...payResponse } } );
        //     // navigation.dispatch(jumpToAction);
        //     // navigation.navigate("insurance" , { screen : "insuranceHistoryDetails" , params : { ...payResponse } })
        // });
        // return () => unsubscribe()
    } , [id , navHash])
    

    const goToMoreDetailsScreenHandler = () => {
        navigation.push('insurancePaymentMoreDetails' , { items : payResponse.factorItems })
    }


    const orderFromWallet = () => {
        setIsInsidePaymentProcess(true)
        setIsInsidePaymentProcess("wallet");

        fetcher("InsurancePayWallet" , {factorId : id , deliveryMethod : deliverOption})
            .then(({ data }) => {
                if(data === client.static.TRANSACTION.FAIL) {
                    setWalletChargeLessThen(true)
                    setIsInsidePaymentProcess(false);
                }
            })
    }


    const onlineOrder = () => {
        setIsInsidePaymentProcess('online');

        const reqBody = { 
            factorId : id , 
            money : payResponse.amount + additionalPrice , 
            deliveryMethod : deliverOption 
        }

        fetcher("InsuranceDirectPay" , reqBody)
            .then(({ data }) => {
                if(data.allDone && data.url) {
                    Linking.openURL(data.url)
                    .then(_ => {
                        setIsInsidePaymentProcess(false);
                        navigation.navigate("insurance" , { comeFromPayment : true })
                    })
                    .catch(_ => {
                        setIsInsidePaymentProcess(false);
                        Alert.alert("", "امکان ورود به مرورگر وجود ندارد.مجددا تلاش کنید" , [
                            {
                                text : "تایید",
                                onPress : () => {}
                            }
                        ])
                    })
                }
            })
    }

    return loading ? <Loading /> : (<><ScreenWrapper>
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <TouchableOpacity style={appendStyle.moreNavigator} onPress={goToMoreDetailsScreenHandler}>
                    <Feather name="chevron-left" size={24} color={primary} />
                    <Para size={16} color={primary}>جزئیات بیمه نامه</Para>
                </TouchableOpacity>
                <Para size={18} weight="bold">تایید و پرداخت نهایی</Para>
            </View>
                <ScrollView>
                    <InsPayDeliveryOption
                        setPrice={setAdditionalPrice}
                        setOption={setDeliverOption}
                        currentOption={deliverOption}
                        items={payResponse.deliveryModelsItems} />
                    <InsDetailsPay {...payResponse} />
                    <InsurerInfoPay {...payResponse} />
                    <InsTransfereePay {...payResponse} />
                </ScrollView>
            <View style={appendStyle.price}>
                <View style={{ flexDirection : "row" , alignItems : "center" }}>
                    <Para style={{ marginRight : 5 }} color="grey">تومان</Para>
                    <Para weight="bold" size={18}>{numberSeparator(toFarsiNumber(payResponse.amount + additionalPrice))}</Para>
                </View>
                <Para size={16}>مبلغ قابل پرداخت</Para>
            </View>
            <View style={appendStyle.ctaContainer}>
                <TouchableOpacity disabled={isInsidePaymentProcess} onPress={onlineOrder} style={[appendStyle.cta , isInsidePaymentProcess ? appendStyle.ctaDisabled : {}]}>
                    <Para color={primary} align="center" weight="bold">
                        {
                            isInsidePaymentProcess && isInsidePaymentProcess === "online" ? "در حال انتقال..." : client.static.PAYMENT.ONLINE_ORDER
                        }
                    </Para>
                </TouchableOpacity>
                <TouchableOpacity onPress={orderFromWallet} disabled={isInsidePaymentProcess} style={[appendStyle.cta , { backgroundColor : generateColor(primary , 3) } , isInsidePaymentProcess ? appendStyle.ctaDisabled : {}]}>
                    <Para color={primary} align="center" weight="bold">
                    {
                        isInsidePaymentProcess && isInsidePaymentProcess === "wallet" ? "در حال انتقال..." : client.static.PAYMENT.WALLET_ORDER
                    }
                    </Para>
                </TouchableOpacity>
            </View>
        </View>
        </ScreenWrapper>
                    {
                        walletChargeLessThen ? <Drawer onClose={() => setWalletChargeLessThen(false)}>
                            <View style={appendStyle.walletAmountInvalid}>
                                <Para size={16}>اعتبار کیف پول کمتر از مبلغ بیمه نامه میباشد</Para>
                                <TouchableOpacity style={appendStyle.walletAmountInvalidCta} onPress={() => setWalletChargeLessThen(false)}>
                                    <Para width="bold" size={16} align="center">تایید</Para>
                                </TouchableOpacity>
                            </View>
                        </Drawer> : null
                    }
        </>)
}

// const redirectToMobileAppAction = () => {
    // const url = 'intent://APP_HOST/#Intent;scheme=KarbaladNative;package=com.karbalad.karbalad;end';
    // window.location.replace(url);
// }

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width : "90%",
        marginHorizontal : "5%",
        flex: 1
    },
    header : {
        marginTop : StatusBar.currentHeight + 10,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : 'space-between',
        paddingHorizontal : 10,
        height: 80,
    },
    moreNavigator : {
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : 'center'
    },
    ctaContainer : {
        flexDirection : "row",
        justifyContent : 'space-between',
    },
    cta : {
        width : "49%",
        backgroundColor : generateColor(primary , 5),
        padding: 20,
        borderRadius : baseBorderRadius,
        alignItems : 'center',
        justifyContent : 'center'
    },
    price : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingVertical : 20
    },
    ctaDisabled : {
        opacity: .5
    },
    walletAmountInvalid : {
        height: "100%",
        justifyContent : "center",
        alignItems : "center"
    },
    walletAmountInvalidCta : {
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        padding: 15,
        width : "90%",
        marginTop : 10
    }
})

export default InsurancePay;
