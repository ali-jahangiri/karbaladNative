import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder, numberSeparator, toFarsiNumber } from '../utils';
import Para from './Para';


const RequirementInstallmentIntro = ({ data , setIsValid }) => {
    const appendStyle = useStyle(style);
    
    const { installment : { ghests } , insCoLogo , coName , catName , amount } = data;

    // * NOTE this stage don't have any validation , therefore we can go to next stage 
    useEffect(() => setIsValid(true) , []);

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.starterHeader}>
                <View style={{ marginRight : 10 }}>
                    <Para size={18} weight="bold">{coName}</Para>
                    <Para>{catName}</Para>
                </View>
                <Image source={{ uri : imageFinder(insCoLogo) , width : 80 , height : 80 }} />
            </View>
            <View style={appendStyle.mainPrice}>
                <View style={{ flexDirection : 'row' , alignItems: 'center' }}>
                    <Para style={appendStyle.mainPriceUnit}>تومان</Para>
                    <Para weight="bold" style={appendStyle.mainPriceText} size={20}>{numberSeparator(toFarsiNumber(amount))}</Para>
                </View>
                <Para>مبلغ قابل پرداخت :</Para>
            </View>
            <ScrollView >
                {
                    ghests.map((el , i) => (
                        <View key={i} style={appendStyle.ghestItem}>
                            <View>
                                <Para style={{ position : "absolute" , top : -20 }} color="grey">تومان</Para>
                                <Para size={16}>{toFarsiNumber(numberSeparator(el.amount))}</Para>
                            </View>
                            <Para size={16}>{toFarsiNumber(el.sarResid)}</Para>
                            <Para size={16}>{el.ghestKind}</Para>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const style = ({ primary }) => StyleSheet.create({
    container : {
        width : "90%",
        marginHorizontal : "5%",
    },
    ghestItem : {
        marginVertical : 20,
        flexDirection : "row",
        justifyContent : 'space-between'
    },
    index : {
        alignItems : 'center',
        justifyContent : 'center'
    },
    starterHeader : {
        flexDirection : "row",
        justifyContent : 'flex-end',
        alignItems : 'center',
    },
    mainPrice : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'space-between',
        marginVertical : 30
    },
    mainPriceText : {
        color: primary
    },
    mainPriceUnit : {
        marginRight : 5,
        color: generateColor(primary , 9)
    }
})

export default RequirementInstallmentIntro;