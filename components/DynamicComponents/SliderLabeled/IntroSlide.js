import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { imageFinder } from '../../../utils';
import Para from '../../Para';


const IntroSlide = ({ introIcon , introContent , introTitle , passedStyle }) => {
    const appendStyle = style(passedStyle);
    return (
        <View style={appendStyle.container}>
            {
                !!introIcon && <Image style={{ alignSelf : "flex-end" , marginBottom : 5 }} source={{ uri : imageFinder(introIcon) , width : 50 , height : 50}} />
            }
            <Para style={appendStyle.title} weight="bold">{introTitle}</Para>
            <Para>{introContent}</Para>
        </View>
    )
}

const style = ({ slideHeight , slideWidth , titleFontSize , titleColor }) => StyleSheet.create({
    container : {
        width : Number(slideWidth),
        height : Number(slideHeight),
        marginLeft : 30,
        marginRight : 15,
    },
    title : {
        fontSize : Number(titleFontSize),
        color : titleColor,
    }
})

export default IntroSlide;