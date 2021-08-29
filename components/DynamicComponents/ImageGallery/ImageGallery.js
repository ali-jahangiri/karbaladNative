import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Para from "../../Para";
import { useStyle } from "../../../Hooks/useStyle"
import useRedirection from '../../../Hooks/useRedirection/useRedirection';
import { booleanExtractor, borderConstructor, generateColor, imageFinder } from '../../../utils';
import { Feather } from '@expo/vector-icons';


const ImageGalleryItem = ({ value , Link , selectedInternalPath , passedStyle }) => {
    const appendedStyle = useStyle(itemStyle , passedStyle);
    const redirectionHandler = useRedirection({ webLink : Link , selectedInternalPath})
    
    return (
        <TouchableOpacity activeOpacity={!Link ? 1 : .9} style={appendedStyle.container} onPress={redirectionHandler}>
            <Image style={appendedStyle.image} resizeMode="contain" source={{ uri: imageFinder(value), }} />
        </TouchableOpacity>
    )
}

const MoreMocked = ({ passedStyle , webLink , internalPath }) => {
    const appendedStyle = useStyle(moreItemsStyle , passedStyle);



    const redirectionHandler = useRedirection({ webLink , selectedInternalPath : internalPath })

    return (
        <TouchableOpacity style={appendedStyle.container} onPress={redirectionHandler}>
            <Feather style={{ marginRight : 10 }} name="chevron-left" size={24} style={appendedStyle.icon}/>
            <Para style={appendedStyle.text}>مشاهده همه</Para>
        </TouchableOpacity>
    )
}

const moreItemsStyle = ({ primary } , { imageContainerWidth , imageContainerMargionBottom , imageContainerHeight , imageBorder }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems  :'center',
        justifyContent : 'center',
        width: `${imageContainerWidth}%`,
        marginBottom : `${imageContainerMargionBottom}%`,
        height : Number(imageContainerHeight),
        backgroundColor : generateColor(primary , 2),
        ...borderConstructor(imageBorder),
    },text : {
        color: primary
    },icon : {
        color: primary
    }
})

const itemStyle = ({} ,  { imageBorder , imageContainerMargionBottom , imageContainerWidth , imageContainerHeight ,  }) => StyleSheet.create({
    container : {
        width: `${imageContainerWidth}%`,
        marginBottom : `${imageContainerMargionBottom}%`,
        height : Number(imageContainerHeight),
        ...borderConstructor(imageBorder),
    },
    image : {
        width : "100%" ,
        height : "100%",
        borderRadius : borderConstructor(imageBorder).borderRadius
    }
})

const ImageGallery = ({ componentDatas : { imageList , title , webLinkMoreOptionPath }, componentStyles }) => {
    const appendedStyle = useStyle(style , componentStyles);

    const internalPathList = Object.entries(componentStyles).filter(([key]) => key.includes("internalPathRedirection")).map(([_ , value]) => value);

    return (
        <View style={appendedStyle.container}>
            <View style={appendedStyle.header}>
                {
                    !!title && <Para style={appendedStyle.title}>{title}</Para>
                }
            </View>
            <View style={appendedStyle.itemContainer}>
                {
                    JSON.parse(imageList).map((el , i) => <ImageGalleryItem key={i} passedStyle={componentStyles} {...el} selectedInternalPath={internalPathList[i]} />)
                }
                {
                    !!booleanExtractor(componentStyles.showMoreOption) && <MoreMocked webLink={webLinkMoreOptionPath} internalPath={componentStyles.internalMoreOptionPath} passedStyle={componentStyles} text={""} />
                }
            </View>
        </View>
    )
}

const style = ({} , { titleColor , titleFontSize , containerBgColor , mainContainerPadding }) => StyleSheet.create({
    container : {
        padding: Number(mainContainerPadding),
        backgroundColor : containerBgColor,
    },
    itemContainer : {
        flexDirection :"row",
        alignItems : 'center',
        flexWrap : "wrap",
        justifyContent : 'space-between',
    },
    title : {
        fontSize : Number(titleFontSize),
        color: titleColor
    }
})

export default ImageGallery;