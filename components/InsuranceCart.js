import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Para from './Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder , booleanExtractor } from '../utils';


const InsuranceCart = ({ name , onItemPress , cat , id , webIcon , passedStyle }) => {
    const appendStyle = useStyle(style , passedStyle);

    return (
        <TouchableWithoutFeedback style={{ flex : 1 }} onPress={() => onItemPress({cat : cat || [] , name , id})}>
            <View style={appendStyle.container}>
                <Para weight={passedStyle.fontWeight} style={appendStyle.label} size={18}>{name}</Para>
                <View style={appendStyle.bottomContainer}>
                    {
                        booleanExtractor(passedStyle.showArrow) && <Feather name="arrow-down-left" size={24} color="black" />
                    }
                    {
                        webIcon && booleanExtractor(passedStyle.showIcon) ? <Image style={{ marginBottom : 10 , opacity : Number(passedStyle.iconOpacity) / 100 }} source={{
                            uri : imageFinder(webIcon),
                            width: 50,
                            height : 50
                        }} /> : null
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const style = ({ baseBorderRadius , primary } , { labelColor , rowDistance , itemHeight , itemWidth , fontSize }) => StyleSheet.create({
    container : {
        width: `${itemWidth}%`,
        marginBottom : `${rowDistance}%`,
        backgroundColor : generateColor(primary , 9),
        height: Number(itemHeight),
        justifyContent : 'space-between',
        padding: 10,
        borderRadius : baseBorderRadius,
    },
    bottomContainer : {
        flexDirection : "row" , 
        justifyContent : 'space-between', 
        alignItems : 'center' 
    },
    label : {
        color : labelColor,
        fontSize : Number(fontSize),

    }
})


export default InsuranceCart;