import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';


import { Feather } from '@expo/vector-icons';
import { useStyle } from '../../../Hooks/useStyle';
import Para from '../../Para';
import { generateColor, imageFinder } from '../../../utils';
import useRedirection from '../../../Hooks/useRedirection/useRedirection';

const _webLinkPosition = {
    left : "flex-start",
    center : "center",
    right : "flex-end"
}

const _contentContainerDirection = {
    top : "flex-start",
    center : 'center',
    bottom : 'flex-end'
}


const Slide = ({ Link , TEXT : title , value : image , passedStyle , backgroundColor , desc , webLinkLabel , internalRedirection}) => {
    const appendStyle = useStyle(style , { backgroundColor , ...passedStyle });
    const redirectionHandler = useRedirection({ selectedInternalPath : internalRedirection , webLink : Link });

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                {
                    image ? <TouchableOpacity style={appendStyle.imageContainer} onPress={redirectionHandler}>
                        <Image style={appendStyle.image} resizeMode={"contain"} source={{ uri : imageFinder(image) }} />
                    </TouchableOpacity> : null
                }
                {
                    !!title && <Para style={appendStyle.title} weight="bold">{title}</Para>
                }
                {
                    !!desc && <Para style={appendStyle.subTitle}>{desc}</Para>
                }
                {
                    Link ? <TouchableOpacity style={appendStyle.linkToWeb} onPress={redirectionHandler}>
                        <Feather style={{ marginRight : 5 }} name="arrow-up-left" size={24} color="black" />
                        <Para style={appendStyle.linkText}>{webLinkLabel}</Para>
                    </TouchableOpacity> : null
                }
            </View>
        </View>
    )
}


const style = ({ primary }, { 
                                backgroundColor , 
                                titleFontSize , 
                                subTitleFontSize , 
                                titleColor , 
                                subTitleColor , 
                                imageBorderRadius , 
                                webLinkTriggerPosition , 
                                contentContainerPadding , 
                                contentContainerXDirection , 
                                contentContainerYDirection , 
                                linkTextFontSize ,
                                imageSizeByPercentage,
                            }) =>  StyleSheet.create({
    container : {
        backgroundColor : backgroundColor || generateColor(primary , 5),
        flex : 1,
    },
    innerContainer : {
        flex : 1,
        alignItems : _contentContainerDirection[contentContainerXDirection],
        justifyContent : _contentContainerDirection[contentContainerYDirection],
        width : "100%",
        padding : Number(contentContainerPadding)
    },
    title : {
        fontSize : Number(titleFontSize),
        color : titleColor,
    },
    subTitle : {
        fontSize : Number(subTitleFontSize),
        color: subTitleColor
    },
    imageContainer : {
        width : "100%" ,
        height : `${imageSizeByPercentage}%`,
        marginVertical : 10,
    },
    image : {
        borderRadius : Number(imageBorderRadius),
        height : "100%",
        width : "100%"
    },
    linkToWeb : {
        flexDirection : "row",
        alignItems : 'center',
        marginVertical : 15,
        alignSelf : _webLinkPosition[webLinkTriggerPosition],
        padding : 15
    },
    linkText : {
        fontSize : Number(linkTextFontSize)
    }
})

export default Slide;