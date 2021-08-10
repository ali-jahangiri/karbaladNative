import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import Para from '../../Para';


const HeaderFullWith = ({ title })  => {
    const appendStyle = useStyle(style);
    const { headerTitleColor } = useStyle();

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                <View></View>
                <Para color={headerTitleColor} size={22} weight="bold">{title}</Para>
            </View>
        </View>
    )
}


const style = ({ primary }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor : generateColor(primary , 9),
        paddingTop : StatusBar.currentHeight + 30,
        paddingBottom : StatusBar.currentHeight + 10,
        marginBottom : 20
    },
    innerContainer : {
        width : "90%",
        marginHorizontal : "5%"
    }
})

export default HeaderFullWith;