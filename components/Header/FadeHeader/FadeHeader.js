import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useStyle } from "../../../Hooks/useStyle"
import Para from '../../Para';

import DirectionCta from '../../DirectionCta';
import { useNavigation } from '@react-navigation/native';
import { generateColor, imageFinder } from '../../../utils';
import useRedirection from '../../../Hooks/useRedirection/useRedirection';


const DEFAULT_ICON_PATH = "846086bc-4811-4837-afda-ba39f6e0c4d8.png{DATA}";



const FadeHeader = ({ isNested , componentStyles , componentDatas }) => {
    const appendStyle = useStyle(style , componentStyles);
    const { primary } = useStyle()

    const navigation = useNavigation();

    const primaryRedirectionHandler = useRedirection({ webLink : componentDatas.primaryIconWebLink , selectedInternalPath : componentStyles.internalPathRedirectionPrimary });
    const secondaryRedirectionHandler = useRedirection({ webLink : componentDatas.secondaryIconWebLink , selectedInternalPath : componentStyles.internalPathRedirectionSecondary});

    return (
        <LinearGradient
            style={appendStyle.container}
            colors={[componentStyles.headerBgColor , "white"]} >
                <View style={appendStyle.innerContainer}>
                    {
                        DEFAULT_ICON_PATH !== componentDatas.primaryIcon && <TouchableOpacity onPress={primaryRedirectionHandler} activeOpacity={1}>
                            <Image style={appendStyle.icon} resizeMode="center" source={{ uri : imageFinder(componentDatas.primaryIcon)}} />
                        </TouchableOpacity>
                    }
                    {
                        DEFAULT_ICON_PATH !== componentDatas.secondaryIcon && <TouchableOpacity onPress={secondaryRedirectionHandler} activeOpacity={1}>
                            <Image style={appendStyle.icon} resizeMode="center" source={{ uri : imageFinder(componentDatas.secondaryIcon) }} />
                        </TouchableOpacity>
                    }
                    {
                        isNested ? isNested === true ?  <DirectionCta containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} /> : isNested : <View />
                    }
                    
                    {
                        typeof componentDatas.title === 'string' ? <Para color={componentStyles.textColor} size={Number(componentStyles.fontSize)} weight="bold" >{componentDatas.title}</Para> : null
                    }
                </View>
        </LinearGradient>
    )
}


const style = (_ , { headerHeight , headerBgColor , iconWidth , iconHeight }) => StyleSheet.create({
    container : {
        paddingTop : StatusBar.currentHeight,
        minHeight : 100,
        alignItems : 'center',
        justifyContent : 'space-between',
        height: Number(headerHeight) * 1.7,
        backgroundColor : headerBgColor
    },
    innerContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : "80%",
        paddingTop : 20,
        paddingBottom : 25,
        marginHorizontal : "10%"
    },
    icon : {
        width: Number(iconWidth),
        height : Number(iconHeight)
    }
})

export default FadeHeader;