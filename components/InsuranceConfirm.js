import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder, toFarsiNumber } from '../utils';
import InsConfirmItem from './InsConfirmItem';

import Para from './Para';
import NextStepBtn from "./NextStepBtn";

import ScreenWrapper from "./ScreenWrapper";


const InsuranceConfirm = ({ route : { params : { factorItems , insModel , haveInstallment , reqId , installment_Value , formulId } } , navigation }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();
    

    const installmentHandler = () => {
        navigation.push("insuranceInstallment" , { factorId : haveInstallment , reqId , installment_Value })
    }

    
    const goDirectlyToRequirement = () => {
        navigation.push("insuranceRequirements" , { factorId : formulId , reqId , installmentId : null })
    }

    return (
        <ScreenWrapper>
            <View style={appendStyle.header}>
                <NextStepBtn
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
                    <View style={appendStyle.starterBullet} />
                    {
                        factorItems?.map((el , i) => (
                            <InsConfirmItem 
                                index={i}
                                label={el.lable} 
                                value={el.show_Value} 
                                key={i} />
                        ))
                    }
                </ScrollView>

                    <View style={appendStyle.ctaContainer}>
                        <View style={appendStyle.price}>
                            <Para size={12} color="grey" style={appendStyle.priceUnit}>تومان</Para>
                            <Para size={18} weight="bold">{toFarsiNumber(insModel.price)}</Para>
                        </View>
                        <View style={appendStyle.actionsContainer}>
                            <TouchableOpacity onPress={goDirectlyToRequirement} style={[appendStyle.action , { backgroundColor : generateColor(primary , 5) }]}>
                                <Para weight="bold" align="center" size={16}>سفارش</Para>
                            </TouchableOpacity>
                            {
                                haveInstallment ? <TouchableOpacity onPress={installmentHandler} style={[appendStyle.action , { backgroundColor : generateColor(primary , 3) }]}>
                                        <Para weight="bold" align="center" size={16}>قسطی</Para>
                                    </TouchableOpacity> : null
                            }
                        </View>
                    </View>
        </ScreenWrapper>
    )
}

const style = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {
        flex: 1
    },
    header : {
        alignItems : "center",
        marginTop : StatusBar.currentHeight + 10
    },
    price : {
        flexDirection : "row",
        alignItems : 'center',
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
        borderRadius : 15,
        overflow: "hidden"
    },
    action : {
        flex: 1,
        width: "100%",
        padding: 15
    },
    priceUnit : {
        position: "absolute",
        top: -10,
    },
    starterBullet : {
        width : 15,
        height : 15,
        marginTop : 10,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 3),
        alignSelf : "center",
    }
})


export default InsuranceConfirm;