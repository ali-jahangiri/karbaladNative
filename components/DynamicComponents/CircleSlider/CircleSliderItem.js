import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import useRedirection from '../../../Hooks/useRedirection/useRedirection';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor, imageFinder } from '../../../utils';
import Para from '../../Para';


const CircleSliderItem = ({ title , bgColor , internalPath , webLink = "-" , icon , passedStyle }) => {
    const appendStyle = useStyle(style , { bgColor ,  ...passedStyle });

    const redirectionHandler = useRedirection({ webLink , selectedInternalPath : internalPath })

    
    return (
        <TouchableOpacity style={appendStyle.mainContainer} onPress={redirectionHandler} >
            <View style={[appendStyle.container , { backgroundColor : bgColor }]}>
                {
                    icon ? <Image style={appendStyle.image} source={{ uri : imageFinder(icon) }} /> : <Para>{title}</Para>
                }

            </View>
            {
                !!icon && <Para style={appendStyle.helperText}>{title}</Para>
            }
        </TouchableOpacity>
    )
}


const style = ({} , { bgColor , slideSize , slideBorderRadius , sliderImageBorderRadius , slideImageSize }) => StyleSheet.create({
    mainContainer : {
        alignItems : 'center',
        justifyContent : 'center',
    },
    container : {
        width : Number(slideSize),
        height: Number(slideSize),
        borderRadius : Number(slideBorderRadius),
        alignItems : 'center',
        justifyContent : 'center',
        marginHorizontal : 10,
        borderWidth : 5,
        borderColor : generateColor(bgColor , 5)
    },
    image : {
        width : Number(slideImageSize),
        height : Number(slideImageSize),
        borderRadius : Number(sliderImageBorderRadius),

    },
    helperText : {
        marginTop : 5
    }
})

export default CircleSliderItem;