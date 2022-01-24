import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Para from "../../Para";
import { useStyle } from "../../../Hooks/useStyle"
import useRedirection from '../../../Hooks/useRedirection/useRedirection';
import { booleanExtractor, borderConstructor, generateColor, imageFinder } from '../../../utils';
import { Feather } from '@expo/vector-icons';


const ImageGalleryItem = ({ value , Link , selectedInternalPath , passedStyle , desc }) => {
    const appendedStyle = useStyle(itemStyle , passedStyle);
    const redirectionHandler = useRedirection({ webLink : Link , selectedInternalPath})
    return (
        <TouchableOpacity activeOpacity={!Link ? 1 : .9} style={appendedStyle.container} onPress={redirectionHandler}>
            <Image style={appendedStyle.image} resizeMode="contain" source={{ uri: imageFinder(value), }} />
            {
                desc && <Para style={appendedStyle.descText}>{desc}</Para>
            }
        </TouchableOpacity>
    )
}

const MoreMocked = ({ passedStyle , webLink , internalPath }) => {
    const appendedStyle = useStyle(moreItemsStyle , passedStyle);



    const redirectionHandler = useRedirection({ webLink , selectedInternalPath : internalPath })

    return (
        <TouchableOpacity style={appendedStyle.container} onPress={redirectionHandler}>
            <Feather name="chevron-left" size={24} style={appendedStyle.icon}/>
            <Para style={appendedStyle.text}>مشاهده همه</Para>
        </TouchableOpacity>
    )
}

const moreItemsStyle = ({ primary } , { imageContainerWidth , imageContainerHeight , imageBorder }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems  :'center',
        justifyContent : 'center',
        width: `${imageContainerWidth}%`,
        height : Number(imageContainerHeight),
        backgroundColor : generateColor(primary , 2),
        ...borderConstructor(imageBorder),
    },text : {
        color: primary
    },icon : {
        color: primary
    }
})

const itemStyle = ({} ,  { imageBorder , imageContainerWidth , imageContainerHeight , imageContainerPadding }) => StyleSheet.create({
    container : {
        width: `${imageContainerWidth}%`,
        height : Number(imageContainerHeight),
        padding: Number(imageContainerPadding),
        ...borderConstructor(imageBorder),
    },
    image : {
        width : "100%" ,
        height : "100%",
        borderRadius : borderConstructor(imageBorder).borderRadius
    },
    descText : {

    }
})



const DEFAULT_IMG_SRC = 'a26dec84-ba92-4e31-b597-704ca6634798.jpg{DATA}';

const ImageGallery = ({ componentDatas , componentStyles }) => {
    const imageList = Object.entries(componentDatas).filter(([label , imgSrc]) => label.includes("image") && imgSrc !== DEFAULT_IMG_SRC).map(([, value]) => value);
    const descList = Object.entries(componentDatas).filter(([label , value]) => label.includes("itemDesc") && value && value !== " ").map(([, value]) => value);

    const appendedStyle = useStyle(style , componentStyles);

    const internalPathList = Object.entries(componentStyles).filter(([key]) => key.includes("internalPathRedirection")).map(([_ , value]) => value);

    return (
        <View style={appendedStyle.container}>
            <View style={appendedStyle.header}>
                {
                    !!componentDatas.title && <Para style={appendedStyle.title}>{componentDatas.title}</Para>
                }
            </View>
            <View style={appendedStyle.itemContainer}>
                {
                    imageList.map((el , i) => <ImageGalleryItem desc={descList?.[i]} key={i} passedStyle={componentStyles} Link={""} value={el} selectedInternalPath={internalPathList[i]} />)
                }
                {
                    !!booleanExtractor(componentStyles.showMoreOption) && <MoreMocked webLink={componentDatas.webLinkMoreOptionPath} internalPath={componentStyles.internalMoreOptionPath} passedStyle={componentStyles} text={""} />
                }
            </View>
        </View>
    )
}

const style = ({} , { titleColor , titleFontSize , containerBgColor , mainContainerPadding , containerMarginTop , containerMarginBottom }) => StyleSheet.create({
    container : {
        padding: Number(mainContainerPadding),
        backgroundColor : containerBgColor,
        marginTop : Number(containerMarginTop),
        marginBottom : Number(containerMarginBottom),
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