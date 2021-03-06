import { Feather,  MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import DirectionCta from '../DirectionCta';
import Para from '../Para';

const ChatHeader = ({ getRefreshed , haveBugBadge }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle()
    const navigation = useNavigation();

    const iconRenderChecker = () => {
        if(haveBugBadge) return <Feather name="info" size={24} color="#5e61ce" />
        else return getRefreshed ? <MaterialCommunityIcons name="star-four-points-outline" size={25} color={'#C9D8B6'} /> : <SimpleLineIcons name="support" size={25} color={generateColor(primary , 9)} />
    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                <DirectionCta direction="left" iconColor={generateColor(primary , 9)} containerBgColor={generateColor(primary , 2)} onPress={navigation.goBack} />
                <Para size={18} weight="bold">پشتیبانی</Para>
                <View style={[appendStyle.supportIconContainer , haveBugBadge && { backgroundColor : "#5e61ce4f" } , getRefreshed && { backgroundColor :  "#57837B" }]}>
                    {iconRenderChecker()}
                </View>
            </View>
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        paddingTop : StatusBar.currentHeight + 20,
        paddingVertical : StatusBar.currentHeight,
    },
    supportIconContainer : {
        backgroundColor : generateColor(primary , 2),
        padding: 15,
        borderRadius : baseBorderRadius
    },
    innerContainer : {
        width: "90%",
        marginHorizontal : "5%",
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'space-between',
    }
})

export default ChatHeader;