import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View , Dimensions } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import imageFinder from '../../utils/imageFinder';
import Para from '../Para';
import { borderConstructor } from '../../utils';

const GridItem = ({
    name , 
    cat ,
    webIcon ,
    id , 
    redirectHandler,
    passedStyle,
}) => {
    const appendStyle = useStyle(style , passedStyle);
    
    return (
        <TouchableOpacity activeOpacity={.9} onPress={() => redirectHandler({cat , name , id})} style={appendStyle.container}>
            <View style={appendStyle.imgContainer}>
                <Image resizeMode='contain' style={appendStyle.img} source={{ uri : imageFinder(webIcon) }} />
            </View>
            <Para align='center' style={appendStyle.titleText}>{name}</Para>
        </TouchableOpacity>
    )
}

const screenWidth =  Dimensions.get("screen").width;

const style = (_ , { itemBgColor , itemImageContainerSize , itemImageBoxBorder , itemFontColor , itemImageSize }) => StyleSheet.create({
    container : {
        width : screenWidth / 4,
        marginVertical : 10,
        justifyContent : "center",
        alignItems : "center",
        textAlign : 'center'
    },
    img : {
        width : Number(itemImageSize) , 
        height : Number(itemImageSize)
    },
    imgContainer : {
        backgroundColor : itemBgColor,
        padding : Number(itemImageContainerSize),
        ...borderConstructor(itemImageBoxBorder),
    },
    titleText : {
        color : itemFontColor,
        marginTop : 5,
        fontSize : 13
    },
})

export default GridItem;