import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { borderConstructor, imageFinder } from '../../utils';
import Para from '../Para';


const Item = ({ Link , TEXT , value , redirectHandler , availableCountOfItem , passedStyle }) => {
    const appendedStyle = useStyle(style , {availableCountOfItem , ...passedStyle });
    
    return (
        <TouchableOpacity activeOpacity={.9} onPress={() => redirectHandler(Link)} style={appendedStyle.container}>
            <View style={appendedStyle.imgContainer}>
                <Image resizeMode='contain' style={appendedStyle.img} source={{ uri : imageFinder(value)}} />
            </View>
            <Para align='center' style={appendedStyle.titleText}>{TEXT}</Para>
        </TouchableOpacity>
    )
}

const screenWidth =  Dimensions.get("screen").width;


const style = (_ , { availableCountOfItem , itemTextColor , itemFontSize , itemBgColor , itemImageContainerSize , itemImageBoxBorder , }) => StyleSheet.create({
    container : {
        width : screenWidth / availableCountOfItem, 
        marginVertical : 10,
        justifyContent : "center",
        alignItems : "center",
        textAlign : 'center',
    },
    img : {
        // width : Number(itemImageSize) , 
        // height : Number(itemImageSize)
        
        width : 50 ,
        height : 50
    },
    imgContainer : {
        backgroundColor : itemBgColor,
        padding : Number(itemImageContainerSize),
        ...borderConstructor(itemImageBoxBorder),
    },
    titleText : {
        color : itemTextColor,
        marginTop : 5,
        fontSize : Number(itemFontSize)
    },
})

export default Item;