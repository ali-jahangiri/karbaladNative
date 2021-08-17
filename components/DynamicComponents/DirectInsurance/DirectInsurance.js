import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { imageFinder } from '../../../utils';
import Para from '../../Para';


const _direction = {
    left : "flex-start",
    center : "center",
    right : "flex-end"
}

const DirectInsurance = ({ componentDatas : { insCategoryName , insId , imageUrl , title , desc , redirectText } , componentStyles }) => {
    const appendStyle = style(componentStyles);
    const navigation = useNavigation()

    const pushToInsuranceHandler = () => {
        navigation.navigate("insStepper" , { name : insCategoryName , id : insId  })
    }

    return (
        <TouchableOpacity onPress={pushToInsuranceHandler} style={appendStyle.container}>
            {
                !!imageUrl && <Image style={appendStyle.image} source={{ uri : imageFinder(imageUrl) }} />
            }
            <Para weight="bold" style={appendStyle.title}>{title}</Para>
            <Para style={appendStyle.desc}>{desc}</Para>
            <View style={appendStyle.ctaContainer}>
                <Feather name="arrow-up-left" size={24} style={appendStyle.ctaIcon} />
                <Para style={appendStyle.ctaText}>{redirectText}</Para>
            </View>
        </TouchableOpacity>
    )
}


const style = ({ 
    titleFontSize ,
    titleColor ,
    descFontSize,
    containerBgColor ,
    containerMarginTop ,
    containerMarginBottom ,
    containerPadding ,
    ctaTextColor,
    descTextColor,
    ctaTextFontSize,
    imageSize,
    imageDirection
 }) => StyleSheet.create({
    container : {
        marginTop : Number(containerMarginTop),
        marginBottom : Number(containerMarginBottom),
        backgroundColor : containerBgColor,
        padding : Number(containerPadding),

    },
    desc : {
        fontSize : Number(descFontSize),
        color: descTextColor,
    },
    title : {
        color: titleColor,
        fontSize : Number(titleFontSize),
    },
    image : {
        width : Number(imageSize),
        height : Number(imageSize),
        alignSelf : _direction[imageDirection]
    },
    ctaIcon : {
        color: ctaTextColor,
    },
    ctaText : {
        fontSize : Number(ctaTextFontSize),
        color: ctaTextColor,
    },
    ctaContainer : {
        flexDirection : "row",
        alignItems : "center",
    }
})

export default DirectInsurance;