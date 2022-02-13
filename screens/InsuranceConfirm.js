import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder, toFarsiNumber } from '../utils';

import Para from '../components/Para';
import DirectionCta from "../components/DirectionCta";

import ScreenWrapper from "../components/ScreenWrapper";
import client from '../client';
import ComponentGenerator from '../HOC/ComponentGenerator/ComponentGenerator';
import useScreenDynamic from '../Hooks/useScreenDynamic/useScreenDynamic';


const { CASH , INSTALLMENT , DIRECT_ORDER } = client.static.INS_CONFIRM

const InsuranceConfirm = ({ route : { params : { factorItems , insModel , haveInstallment , reqId , installment_Value , formulId } } , navigation }) => {
    const appendStyle = useStyle(style);
    const { primary , ctaTextColor } = useStyle();
    const [screenDetailsLoading , screenDetails] = useScreenDynamic(client.static.ROUTES_GUID.insuranceConfirm);
    

    const installmentHandler = () => navigation.push("insuranceInstallment" , { factorId : haveInstallment , reqId , installment_Value })
    const goDirectlyToRequirement = () => navigation.push("insuranceRequirements" , { factorId : formulId , reqId , installmentId : null })

    return (
        <ScreenWrapper>
            <View style={appendStyle.header}>
                <DirectionCta
                    direction="right"
                    extendStyle={{ alignSelf : "flex-end", marginRight : 20 }}
                    containerBgColor={generateColor(primary , 3)}
                    onPress={navigation.goBack} />
                <Image 
                    resizeMode="center" 
                    source={{
                        uri : imageFinder(insModel.icon),
                        width: 80,
                        height: 80
                    }} />
                <Para size={18} align="center" weight="bold">{insModel.name}</Para>
                <Para size={16} color="grey">{insModel.category}</Para>
                
            </View>
            <ScrollView>
                {
                    !screenDetailsLoading && <ComponentGenerator ownerProps={{ factorItems }} itemListForRender={screenDetails.components} />
                }
            </ScrollView>
            <View style={appendStyle.ctaContainer}>
                <View style={appendStyle.price}>
                    <Para size={12} color="grey">تومان</Para>
                    <Para size={18} weight="bold">{toFarsiNumber(insModel.price)}</Para>
                </View>
                <View style={appendStyle.actionsContainer}>
                    <TouchableOpacity onPress={goDirectlyToRequirement} style={[appendStyle.action , { backgroundColor : generateColor(primary , 5) }]}>
                        <Para color={ctaTextColor} weight="bold" align="center" size={16}>
                            { haveInstallment ? CASH : DIRECT_ORDER }
                        </Para>
                    </TouchableOpacity>
                    {
                        haveInstallment ? <TouchableOpacity onPress={installmentHandler} style={[appendStyle.action , { backgroundColor : generateColor(primary , 3) }]}>
                                <Para color={ctaTextColor} weight="bold" align="center" size={16}>{INSTALLMENT}</Para>
                            </TouchableOpacity> : null
                    }
                </View>
            </View>
        </ScreenWrapper>
    )
}

const style = ({ baseBorderRadius }) => StyleSheet.create({
    header : {
        alignItems : "center",
        marginTop : StatusBar.currentHeight
    },
    price : {
        flexDirection : "row",
        alignItems : 'flex-start',
        flexDirection : "column",
        height: "100%",
        flex: .35
    },  
    ctaContainer : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'space-between',
        width: "90%",
        marginHorizontal : "5%"
    },
    actionsContainer : {
        borderRadius : baseBorderRadius ,
        flexDirection : "row",
        justifyContent : "space-between",
        flex: .7,
        overflow: "hidden"
    },
    action : {
        flex: 1,
        width: "100%",
        padding: 15
    },
})


export default InsuranceConfirm;