import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import useRedirection from '../../../Hooks/useRedirection/useRedirection';
import { generateColor, imageFinder } from '../../../utils';
import Para from '../../Para';

const DynamicImage = ({ componentDatas : { src , desc , webLink } , componentStyles }) => {
    const appendStyle = style(componentStyles);
    const redirectionHandler = useRedirection({ webLink  , selectedInternalPath : componentStyles.internalPathRedirection });

    return (
        <TouchableOpacity activeOpacity={redirectionHandler ? 1 : 0} disabled={!redirectionHandler} onPress={redirectionHandler} style={appendStyle.container}>
            <View>
                <Image source={{ uri : imageFinder(src) }} style={appendStyle.image} />
                {
                    !!desc && <View style={appendStyle.descContainer}>
                        <Para style={appendStyle.descText} weight="bold">{desc}</Para>
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const style = ({
    height ,
    width , 
    imageBorderRadius , 
    containerBgColor , 
    containerMarginTop , 
    containerMarginBottom,
    containerBorderRadius,
    containerPadding,
    descTextColor,
    descTextFontSize,
    descContainerBgColor,
}) => StyleSheet.create({
    container : {
        marginTop : Number(containerMarginTop),
        marginBottom : Number(containerMarginBottom),
        backgroundColor : containerBgColor,
        borderRadius : Number(containerBorderRadius),
        paddingVertical : Number(containerPadding),
    },
    image : {
        width : Dimensions.get("screen").width * (width / 100), 
        marginHorizontal : (Dimensions.get("screen").width - (Dimensions.get("screen").width * (width / 100))) / 2,
        height : Number(height),
        borderRadius : Number(imageBorderRadius),
    },
    descContainer : {
        position: "absolute",
        bottom : 0,
        width : Dimensions.get("screen").width * (width / 100),
        marginHorizontal : (Dimensions.get("screen").width - (Dimensions.get("screen").width * (width / 100))) / 2,
        zIndex : 555,
        padding: 15,
        backgroundColor : generateColor(descContainerBgColor , 9),
        borderBottomLeftRadius : Number(imageBorderRadius),
        borderBottomRightRadius : Number(imageBorderRadius)
    },
    descText : {
        color: descTextColor,
        fontSize : Number(descTextFontSize)
    }
})

export default DynamicImage;