import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useStyle } from '../Hooks/useStyle';
import ScreenWrapper from './ScreenWrapper';

import { Feather } from '@expo/vector-icons';


import Para from './Para';
import { generateColor, numberSeparator, toFarsiNumber } from '../utils';
import InsPayDeliveryOption from './InsPayDeliveryOption';
import InsDetailsPay from './InsDetailsPay';
import InsurerInfoPay from './InsurarInfoPay';
import InsTransfereePay from './InsTransfereePay';
import useFetch from '../Providers/useFetch';
import { useSelector } from '../Store/Y-state';
import Loading from './Loading';

const InsurancePay = ({ navigation , route : { params : { id , loadingMessageHelper = "" } } }) => {
    const [payResponse, setPayResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [additionalPrice, setAdditionalPrice] = useState(0);
    const [deliverOption, setDeliverOption] = useState(null)


    const fetcher = useFetch(true);
    const ticket = useSelector(state => state.auth.appKey);
    


    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    console.log(id);

    useEffect(() => {
        fetcher
            .then(({ api , appToken }) => {
                console.log(appToken);
                api.post('InsurancePay' , { factorId : id } , { headers : {
                    appToken ,
                     ticket
                }  })
                .then(res => {
                    // setPadyResponse(data);
                    console.log('currentData' , res);
                    setLoading(false)
                })
            })
       
        // // TODO set this value when request get completed
        // setDeliverOption(payResponse.deliveryModelsItems.find(el => el.thisDefault).id);

        // const unsubscribe = navigation.addListener("beforeRemove" , e => {
        //     e.preventDefault();
        //     navigation.push("home")
        //     unsubscribe()
        //     // const jumpToAction = TabActions.jumpTo('insurance', { screen : "insuranceHistoryDetails" , params : { ...payResponse } } );
        //     // navigation.dispatch(jumpToAction);
        //     // navigation.navigate("insurance" , { screen : "insuranceHistoryDetails" , params : { ...payResponse } })
        // });
        // return () => unsubscribe()
    } , [])
    

    const goToMoreDetailsScreenHandler = () => {
        navigation.push('insurancePaymentMoreDetails' , { items : payResponse.factorItems })
    }

    const onlineOrder = () => {
        Linking.openURL("https://stackoverflow.com/questions/43804032/open-url-in-default-web-browser")
            .catch(err => {
                Alert.alert("", "امکان ورود به مرورگر وجود ندارد.مجددا تلاش کنید" , [
                    {
                        text : "تایید",
                        onPress : () => {}
                    }
                ])
            })
    }

    return loading ? <Loading /> : (<Para>after load</Para>)
}


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
    }
})

export default InsurancePay;




{/* <ScreenWrapper>
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
                    <TouchableOpacity onPress={onlineOrder} style={appendStyle.cta }>
                        <Para color={primary} align="center" weight="bold">
                            پرداخت آنلاین
                        </Para>
                    </TouchableOpacity>
                    <TouchableOpacity style={[appendStyle.cta , { backgroundColor : generateColor(primary , 3) }]}>
                        <Para color={primary} align="center" weight="bold">
                            پرداخت از کیف پول
                        </Para>
                    </TouchableOpacity>
                </View>
            </View>
            </ScreenWrapper> */}