import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useStyle } from "../../../Hooks/useStyle"
import Para from '../../Para';

import DirectionCta from '../../DirectionCta';
import { useNavigation } from '@react-navigation/native';
import { generateColor } from '../../../utils';

const FadeHeader = ({ title ,  isNested , style : injectedStyle }) => {
    const appendStyle = useStyle(style);
    const { primary  , headerTitleColor } = useStyle(style)


    const navigation = useNavigation()

    return (
        <LinearGradient
            style={appendStyle.container}
            colors={[injectedStyle.headerBgColor , "white"]} >
                <View style={appendStyle.innerContainer}>
                    {
                        isNested ? isNested === true ?  <DirectionCta containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} /> : isNested : <View />
                    }
                    
                    {
                        typeof title === 'string' ? <Para color={headerTitleColor} size={22} weight="bold" >{title}</Para> : title
                    }
                </View>
        </LinearGradient>
    )
}


const style = ({ headerHeight }) => StyleSheet.create({
    container : {
        paddingTop : StatusBar.currentHeight,
        minHeight : 100,
        alignItems : 'center',
        justifyContent : 'space-between',
        height: Number(headerHeight)
    },
    innerContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : "80%",
        paddingTop : 20,
        paddingBottom : 25,
        marginHorizontal : "10%"
    }
})

export default FadeHeader;