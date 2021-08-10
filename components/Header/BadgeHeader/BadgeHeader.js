import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import Para from '../../Para';



const BadgeHeader = ({ title }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    return (
        <View style={appendStyle.container}>
            <View></View>
            <View style={appendStyle.badge}>
                <Para color={primary} size={21} weight="bold">{title}</Para>
            </View>
        </View>
    )
}



const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'space-between',
        marginTop : StatusBar.currentHeight + 20,
        width : "90%",
        marginHorizontal : "5%",
        marginBottom : 10
    },
    badge : {
        padding : 10,
        paddingHorizontal : 30,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 1)
    }
})

export default BadgeHeader;