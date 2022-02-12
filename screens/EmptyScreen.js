import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View , Dimensions } from 'react-native';
import client from '../client';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';


const { EMPTY_SCREEN_TEXT } = client.static;

const EmptyScreen = ({ message = EMPTY_SCREEN_TEXT , desc = ""  , extendStyle , shouldFillFullScreen = true }) => {

    const appendStyle = useStyle(style , { shouldFillFullScreen });
    return (
        <View style={[appendStyle.container , extendStyle]}>
            <Feather style={appendStyle.icon} name="archive" size={40} color="black" />
            <Para size={16} color="grey" weight="bold">{message}</Para>
            <Para color="grey">{desc}</Para>
        </View>
    )
}

const screenHeight = Dimensions.get("screen").height;

const style = ({ primary } , { shouldFillFullScreen }) => StyleSheet.create({
    container : {
        ...(shouldFillFullScreen ? { flex : 1 } : { height : screenHeight / 2 }),
        alignItems : "center",
        justifyContent : 'center',

    },
    icon : {
        color: generateColor(primary , 5),
        marginBottom : 10
    }
})

export default EmptyScreen;