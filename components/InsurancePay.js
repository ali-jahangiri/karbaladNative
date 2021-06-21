import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import api from '../api';
import { useStyle } from '../Hooks/useStyle';
import ScreenWrapper from './ScreenWrapper';

import { Feather } from '@expo/vector-icons';

import mock from "../utils/pay.mock"
import Para from './Para';
import { generateColor, numberSeparator } from '../utils';
import InsPayDeliveryOption from './InsPayDeliveryOption';

const InsurancePay = ({ route : { id }, navigation }) => {
    const [payResponse, setPayResponse] = useState(mock)
    const [loading, setLoading] = useState(true);
    const [additionalPrice, setAdditionalPrice] = useState(0);
    const [deliverOption, setDeliverOption] = useState(null)

    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    // TODO after adding auth system , read data from server and handle loading
    useEffect(() => {
        // api.post('InsurancePay' , { factorId : id })
        //     .then(({ data }) => {
        //         setPayResponse(data)
        //         setLoading(false)
        //     })
        // TODO set this value when request get completed
        setDeliverOption(payResponse.deliveryModelsItems.find(el => el.thisDefault).id)
    } , [])

    const goToMoreDetailsScreenHandler = () => {
        navigation.push('insuranceHistoryDetails' , {...payResponse , showCta : false})
    }

    return (
        <ScreenWrapper>
            <View style={appendStyle.container}>
                <View style={appendStyle.header}>
                    <TouchableOpacity style={appendStyle.moreNavigator} onPress={goToMoreDetailsScreenHandler}>
                        <Feather name="chevron-left" size={24} color={primary} />
                        <Para size={16} color={primary}>جزئیات بیمه نامه</Para>
                    </TouchableOpacity>
                    <Para size={18} weight="bold">تایید و پرداخت نهایی</Para>
                </View>
                <View>
                    <ScrollView>
                        <InsPayDeliveryOption
                            currentSelected={deliverOption}
                            onChange={setDeliverOption}
                            items={payResponse.deliveryModelsItems} />
                    </ScrollView>
                </View>
                <View style={appendStyle.price}>
                    <View style={{ flexDirection : "row" }}>
                        <Para style={{ marginRight : 5 }} color="grey">تومان</Para>
                        <Para weight="bold" size={16}>{numberSeparator(payResponse.amount + additionalPrice)}</Para>
                    </View>
                    <Para size={16}>مبلغ قابل پرداخت</Para>
                </View>
                <View style={appendStyle.ctaContainer}>
                    <TouchableOpacity style={[appendStyle.cta , { width : "60%" }]}>
                        <Para align="center" weight="bold">
                            پرداخت آنلاین
                        </Para>
                    </TouchableOpacity>
                    <TouchableOpacity style={appendStyle.cta}>
                        <Para align="center" weight="bold">
                            پرداخت از کیف پول
                        </Para>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width : "90%",
        marginHorizontal : "5%",
    },
    header : {
        marginTop : StatusBar.currentHeight + 10,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : 'space-between'
    },
    moreNavigator : {
        // padding : 15,
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : 'center'
    },
    ctaContainer : {
        flexDirection : "row",
        justifyContent : 'space-between',
    },
    cta : {
        width: "35%",
        backgroundColor : "red",
        padding: 10,
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