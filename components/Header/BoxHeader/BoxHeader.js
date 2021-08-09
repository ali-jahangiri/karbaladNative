import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import DirectionCta from '../../DirectionCta';
import Para from '../../Para';


const BoxHeader = ({ title }) => {
    const appendStyle = useStyle(style);
    const { headerTitleColor } = useStyle()
    return (
        <View style={appendStyle.container}>
            <DirectionCta direction="left" />
            <View>
                <Para color={headerTitleColor} size={25} weight="bold">{title}</Para>
            </View>
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        backgroundColor : primary,
        borderRadius : baseBorderRadius,
        marginTop : StatusBar.currentHeight,
        width : "90%",
        marginHorizontal : "5%",
        padding : 20,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center'
    }
})

export default BoxHeader;