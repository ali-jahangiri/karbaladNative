import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import Para from '../Para';


const Item = ({ name , icon , link , redirectHandler , availableCountOfItem }) => {
    const appendedStyle = useStyle(style , availableCountOfItem);
    
    return (
        <TouchableOpacity activeOpacity={.9} onPress={() => redirectHandler(link)} style={appendedStyle.container}>
            <View style={appendedStyle.imgContainer}>
                <Image resizeMode='contain' style={appendedStyle.img} source={{ uri : 
                        // imageFinder(webIcon)
                        icon
                    }} />
            </View>
            <Para align='center' style={appendedStyle.titleText}>{name}</Para>
        </TouchableOpacity>
    )
}

const screenWidth =  Dimensions.get("screen").width;


const style = (_ , availableCountOfItem) => StyleSheet.create({
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
        // backgroundColor : itemBgColor,
        // padding : Number(itemImageContainerSize),
        // ...borderConstructor(itemImageBoxBorder),
    },
    titleText : {
        // color : itemFontColor,
        color : "red",
        marginTop : 5,
        fontSize : 13
    },
})

export default Item;