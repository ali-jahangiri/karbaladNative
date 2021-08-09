import React from 'react';
import { Alert, Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import Para from '../Para';

import { generateColor } from "../../utils"
import { Feather } from '@expo/vector-icons';

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

const Slide = ({ backgroundColor = "", title = "", subTitle = "", image = "", webLink = "", passedStyle , webLinkLabel }) => {
    const appendStyle = useStyle(style , { backgroundColor , ...passedStyle });

    const openLinkHandler = () => {
        Linking.openURL(webLink)
            .catch(_ => {
                Alert.alert("ارتباط برقرار نشد" , "خطا در ارسال به مرورگر. مجدد تلاش نمایید" ,
                [{
                        onPress : () => {},
                        text : "تایید"
                }])
            })
    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                {
                    image ? <Image style={appendStyle.image} resizeMode="cover" source={{ uri : image }} /> : null
                }
                <Para style={appendStyle.title} weight="bold">{title}</Para>
                <Para style={appendStyle.subTitle}>{subTitle}</Para>
                {
                    webLink ? <TouchableOpacity style={appendStyle.linkToWeb} onPress={openLinkHandler}>
                        <Feather style={{ marginRight : 5 }} name="arrow-up-left" size={24} color="black" />
                        <Para>{webLinkLabel}</Para>
                    </TouchableOpacity> : null
                }
            </View>
        </View>
    )
}


const style = ({ primary }, { backgroundColor , titleFontSize , subTitleFontSize , titleColor , subTitleColor , imageBorderRadius , webLinkTriggerPosition , contentContainerPadding , contentContainerXDirection , contentContainerYDirection}) =>  StyleSheet.create({
    container : {
        backgroundColor : backgroundColor || generateColor(primary , 5),
        flex : 1,
    },
    innerContainer : {
        flex : 1,
        alignItems : _contentContainerDirection[contentContainerXDirection],
        justifyContent : _contentContainerDirection[contentContainerYDirection],
        width : "80%",
        marginHorizontal : "10%",
        padding : contentContainerPadding
    },
    title : {
        fontSize : titleFontSize,
        color : titleColor
    },
    subTitle : {
        fontSize : subTitleFontSize,
        color: subTitleColor
    },
    image : {
        borderRadius : imageBorderRadius,
        width : 150 ,
        height : 150,
        marginBottom : 10
    },
    linkToWeb : {
        flexDirection : "row",
        alignItems : 'center',
        marginVertical : 15,
        alignSelf : _webLinkPosition[webLinkTriggerPosition],
        padding : 15
    }
})

export default Slide;