import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Para from '../../Para';

import { borderConstructor } from '../../../utils';

import { Feather } from '@expo/vector-icons';
import useRedirection from '../../../Hooks/useRedirection/useRedirection';

const _direction = {
    left : "flex-start",
    center : 'center',
    right : "flex-end",
}

const DynamicText = ({ componentDatas : { content , headerText , linkLabel , webLink } , componentStyles }) => {
    const appendStyle = style(componentStyles);

    const redirectionHandler = useRedirection({ selectedInternalPath : componentStyles.internalPathRedirection , webLink })

    return (
        <View style={appendStyle.container}>
            {
                !!headerText && <Para style={appendStyle.header}>{headerText}</Para>
            }
            <Para style={appendStyle.body}>{content}</Para>
            {/* NOTE if we don't provide a linkLabel , that means we want a link for this component */}
            {
                !!linkLabel && <TouchableOpacity style={appendStyle.ctaContainer} onPress={redirectionHandler}>
                    <Feather style={{ marginRight : 5 }} name="arrow-up-left" size={24} style={appendStyle.linkIcon} />
                    <Para style={appendStyle.linkText}>{linkLabel}</Para>
                </TouchableOpacity>
            }
        </View>
    )
}


const style = ({ contentTextColor , 
                containerPadding , 
                containerBgColor , 
                contentFontSize , 
                containerMarginTop , 
                containerMarginBottom ,
                headerTextColor,
                headerMargin,
                containerHorizontalMargin,
                containerBorder,
                linkTextColor,
                linkBgColor,
                linkDirection,
                linkIconColor,
                linkBorderRadius ,
                linkHeight,
                headerDirection,
                headerFontSize }) => StyleSheet.create({
    container : {
        padding : Number(containerPadding),
        width : "100%",
        backgroundColor : containerBgColor,
        marginTop : Number(containerMarginTop),
        marginBottom : Number(containerMarginBottom),
        marginHorizontal : Number(containerHorizontalMargin),
        ...borderConstructor(containerBorder)
    },
    header : { 
        fontSize : Number(headerFontSize),
        marginBottom : Number(headerMargin),
        color: headerTextColor,
        alignSelf : _direction[headerDirection],
    },
    text : {
        fontSize : Number(contentFontSize),
        color: contentTextColor,
    },
    ctaContainer : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : _direction[linkDirection],
        backgroundColor : linkBgColor,
        borderRadius : Number(linkBorderRadius),
        height: Number(linkHeight)
    },
    linkText : {
        color: linkTextColor
    },
    linkIcon : {
        color: linkIconColor,
    }
})

export default DynamicText;