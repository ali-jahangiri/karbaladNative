import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import client from '../client';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';


const { EMPTY_SCREEN_TEXT } = client.static;

const EmptyScreen = ({ message = EMPTY_SCREEN_TEXT , desc = ""  , extendStyle}) => {
    const appendStyle = useStyle(style);
    return (
        <View style={[appendStyle.container , extendStyle]}>
            <Feather style={appendStyle.icon} name="archive" size={40} color="black" />
            <Para size={16} color="grey" weight="bold">{message}</Para>
            <Para color="grey">{desc}</Para>
        </View>
    )
}

const style = ({ primary  }) => StyleSheet.create({
    container : {
        flex: 1,
        alignItems : "center",
        justifyContent : 'center',

    },
    icon : {
        color: generateColor(primary , 5),
        marginBottom : 10
    }
})

export default EmptyScreen;