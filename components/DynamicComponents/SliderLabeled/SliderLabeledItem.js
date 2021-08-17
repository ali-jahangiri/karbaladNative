import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import useRedirection from '../../../Hooks/useRedirection/useRedirection';
import { imageFinder } from '../../../utils';
import Para from '../../Para';

const _direction = {
    center : "center",
    left : "flex-start",
    right : "flex-end"
}

const SliderLabeledItem = ({ passedStyle , value , Link : webLink , desc , internalPath }) => {
    const appendStyle = style(passedStyle);

    const redirectionHandler = useRedirection({ webLink , selectedInternalPath : internalPath })

    return (
        <TouchableOpacity activeOpacity={1} style={appendStyle.container} onPress={redirectionHandler}>
            <Image style={appendStyle.image} source={{ uri : imageFinder(value) }} />
            <Para>{desc}</Para>
            <Feather name="arrow-down-left" size={24} color="black" />
        </TouchableOpacity>
    )
}


const style = ({ 
                slideBgColor , 
                slideWidth , 
                slideHeight , 
                slideImageSize , 
                imageDirection , 
                imageMarginBottom , 
                slideBorderRadius , 
                slidePadding ,
                slideMarginHorizontal
 }) => StyleSheet.create({
    container : {
        height : Number(slideHeight),
        width : Number(slideWidth),
        backgroundColor : slideBgColor,
        marginHorizontal: Number(slideMarginHorizontal),
        borderRadius : Number(slideBorderRadius),
        padding : Number(slidePadding),
        justifyContent : 'space-between',
        
    },
    image : {
        width : Number(slideImageSize),
        height: Number(slideImageSize),
        alignSelf : _direction[imageDirection],
        marginBottom : Number(imageMarginBottom)
    }
})

export default SliderLabeledItem;