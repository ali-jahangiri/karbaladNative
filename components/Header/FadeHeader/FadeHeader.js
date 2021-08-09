import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useStyle } from "../../../Hooks/useStyle"
import Para from '../../Para';
import { generateColor } from '../../../utils';

const FadeHeader = ({ title }) => {
    const appendStyle = useStyle(style);
    const { primary  , headerTitleColor } = useStyle()

    return (
        <LinearGradient
            style={appendStyle.container}
            colors={[primary , "white"]} >
                <View style={appendStyle.innerContainer}>
                    <Para color={headerTitleColor} size={26} weight="bold" >خانه</Para>
                </View>
        </LinearGradient>
    )
}


const style = () => StyleSheet.create({
    container : {
        paddingTop : StatusBar.currentHeight + 5,
        height : 150,
        alignItems : 'center',
        justifyContent : 'center',
    },
    innerContainer : {
        width : "80%",
        paddingBottom : 25,
        marginHorizontal : "10%"
    }
})

export default FadeHeader;