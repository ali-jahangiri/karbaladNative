import React, { useState } from 'react';
import { Image, RecyclerViewBackedScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder, toFarsiNumber } from '../utils';
import Para from './Para';

import Wealth from './Wealth';

import { Feather } from '@expo/vector-icons';
import InsResultMoreDetails from './InsResultPreviewMoreDetails';
import { useNavigation } from '@react-navigation/native';

const InsuranceResultPreviewItem = ({ insName , factorItems , insIconUrl , formulId , catFullName , showValue , tavangariMali , tedadeShoabKhesarat , rezayatAzMablaghPardakhti , outInsurance : moreDetailsValue ,  installmentList , reqId , installment_Value }) => {
    const appendStyle = useStyle(style);
    const [moreDetailsActive, setMoreDetailsActive] = useState(false);
    const { primary } = useStyle();
    const navigation = useNavigation();
    
    const orderHandler = () => {
        navigation.push('insuranceConfirm' , { factorItems , insModel : { name : insName , icon : insIconUrl , category: catFullName , price : showValue ,  } , haveInstallment : installmentList.find(el => el === formulId) , reqId , installment_Value } )
    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <View style={{ marginRight : 10 , justifyContent : 'center'}}>
                    <Para size={18}>{insName}</Para>
                    {/* <Para color="grey">{'2000'}</Para> */}
                </View>
                <Image resizeMode="center" source={{
                    uri : imageFinder(insIconUrl),
                    width : 60,
                    height: 60
                }} />
            </View>
            <View style={appendStyle.details}>
                    {
                        tavangariMali ? <View style={appendStyle.wealth}>
                            <Wealth wealthNumber={tavangariMali} />
                            <Para size={16} style={appendStyle.detailsLabel}>سطح توانگری</Para>
                        </View> : null
                    }
                    {
                        rezayatAzMablaghPardakhti ? <View style={appendStyle.wealth}>
                                    <View style={appendStyle.satisfaction}>
                                        <View style={appendStyle.satisfactionIcon}>
                                            <Feather name="thumbs-up" size={20} color={generateColor(primary , 8)} />
                                        </View>
                                        <Para align="center" weight="bold" size={18} color={generateColor(primary , 9)} style={appendStyle.detailsValue}>{rezayatAzMablaghPardakhti}</Para>
                                    </View>
                                    <Para size={16} style={appendStyle.detailsLabel}>رضایت مشتری</Para>
                        </View> : null
                    }
                    {
                        tedadeShoabKhesarat ? <View>
                            <View>
                                <Para>تعداد شعب</Para>   
                                <Para>پرداخت خسارت</Para>   
                            </View>
                            <View style={appendStyle.branchesCount}>
                                    <View style={appendStyle.satisfactionIcon}>
                                        <Feather name="hexagon" size={20} color={generateColor(primary , 8)} />
                                    </View>
                                    <Para align="center" weight="bold" size={18} color={generateColor(primary , 8)}>{tedadeShoabKhesarat}</Para>
                            </View>
                        </View> : null
                    }
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
            {
                moreDetailsValue.length ? <InsResultMoreDetails
                                            visible={moreDetailsActive} 
                                            setVisibility={setMoreDetailsActive}
                                            data={moreDetailsValue} /> : null
            }
            <View style={appendStyle.divider} />
        </View>
    )
}

const style = ({ primary , baseBorderRadius , secondary }) => StyleSheet.create({
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
    wealth : {
        flexDirection : "row",
        width: "100%",
        justifyContent : "space-between",
        alignItems : 'center'
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
    header : {
        flexDirection : 'row',
        justifyContent : "flex-end",
    },
    details : {
        justifyContent : 'space-between',
        marginVertical : 20,
    },
    detailsLabel : {
        marginBottom : 10,
        flex: 1
    },
    satisfaction : {
        backgroundColor : generateColor(primary , 2),
        borderRadius : baseBorderRadius,
        padding: 10,
        height: 60,
        flex: 1,
        justifyContent : 'space-between',
        },
    satisfactionIcon : {
        width: "100%",
        backgroundColor : "#fff2",
        padding: 10,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : baseBorderRadius
    },
    branchesCount : {
        backgroundColor : generateColor(primary , 2),
        borderRadius : baseBorderRadius,
        paddingHorizontal: 10,
        paddingTop : 10,
        justifyContent : 'space-between',
        flex: 1
    },
    branchesCountLabel : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    divider : {
        backgroundColor : secondary ,
        width: "98%",
        height: 2,
        marginHorizontal : "1%",
        marginBottom : 10,
        borderRadius : baseBorderRadius
    }
})

export default InsuranceResultPreviewItem;