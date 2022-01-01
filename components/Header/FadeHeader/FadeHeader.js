import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useStyle } from "../../../Hooks/useStyle"
import Para from '../../Para';

import DirectionCta from '../../DirectionCta';
import { useNavigation } from '@react-navigation/native';

import { generateColor }  from "../../../utils"

const DEFAULT_ICON_PATH = "846086bc-4811-4837-afda-ba39f6e0c4d8.png{DATA}";

const FadeHeader = ({ isNested , title = "" }) => {
    const appendStyle = useStyle(style , isNested);
    const { headerBgColor , headerTitleColor , primary , headerFontSize } = useStyle();
    
    const navigation = useNavigation();

    return (
        <LinearGradient
            style={appendStyle.container}
            colors={[headerBgColor , "white"]} >
                <View style={appendStyle.innerContainer}>
                    {
                        isNested ? isNested === true ?  <DirectionCta containerBgColor={generateColor(primary , 5)} onPress={navigation.goBack} /> : isNested : <View />
                    }
                    <Para size={+headerFontSize} color={headerTitleColor} weight="bold" >{title}</Para> 
                </View>
        </LinearGradient>
    )
}


const style = ({ headerHeight , headerBgColor , nestedHeaderHeight } , isNested) => StyleSheet.create({
    container : {
        paddingTop : StatusBar.currentHeight,
        minHeight : 100,
        alignItems : 'center',
        justifyContent : 'space-between',
        height: (isNested ? Number(nestedHeaderHeight) : Number(headerHeight)) * 1.7,
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
})

export default FadeHeader;