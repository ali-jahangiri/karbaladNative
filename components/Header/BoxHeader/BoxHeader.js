import { DefaultTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useRedirection from '../../../Hooks/useRedirection/useRedirection';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor, imageFinder } from '../../../utils';
import DirectionCta from '../../DirectionCta';
import Para from '../../Para';


const DEFAULT_ICON_PATH = "846086bc-4811-4837-afda-ba39f6e0c4d8.png{DATA}";

const BoxHeader = ({ isNested , componentStyles , componentDatas }) => {
    const appendStyle = useStyle(style , componentStyles);
    const { primary } = useStyle();
    const navigation = useNavigation();

    const primaryRedirectionHandler = useRedirection({ webLink : componentDatas.primaryIconWebLink , selectedInternalPath : componentStyles.internalPathRedirectionPrimary })
    const secondaryRedirectionHandler = useRedirection({ webLink : componentDatas.secondaryIconWebLink , selectedInternalPath : componentStyles.internalPathRedirectionSecondary})


    return (
        <View style={appendStyle.container}>
            {
                DEFAULT_ICON_PATH !== componentDatas.primaryIcon && <TouchableOpacity  onPress={primaryRedirectionHandler} activeOpacity={1}>
                    <Image style={appendStyle.icon} resizeMode="center" source={{ uri : imageFinder(componentDatas.primaryIcon)}} />
                </TouchableOpacity>
            }
            {
                DEFAULT_ICON_PATH !== componentDatas.secondaryIcon && <TouchableOpacity onPress={secondaryRedirectionHandler} activeOpacity={1}>
                    <Image style={appendStyle.icon} resizeMode="center" source={{ uri : imageFinder(componentDatas.secondaryIcon) }} />
                </TouchableOpacity>
            }
            {
                isNested ? isNested === true ?  <DirectionCta containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} /> : isNested : null
            }
            
            {
                typeof componentDatas.title === 'string' ? <Para color={componentStyles.textColor} size={22} weight="bold" >{componentDatas.title}</Para> : null
            }
        </View>
    )
}


const style = ({ baseBorderRadius } , { headerBgColor , headerHeight , iconWidth , iconHeight }) => StyleSheet.create({
    container : {
        backgroundColor : headerBgColor,
        marginBottom : 15,
        borderRadius : baseBorderRadius,
        marginTop : StatusBar.currentHeight,
        width : "90%",
        height : Number(headerHeight),
        marginHorizontal : "5%",
        paddingHorizontal : 20,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    icon : {
        width: Number(iconWidth),
        height : Number(iconHeight)
    }
})

export default BoxHeader;