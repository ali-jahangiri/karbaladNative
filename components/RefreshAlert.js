import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { generateColor } from '../utils';

import client from '../client';



const RefreshAlert = ({ position }) => {
    const appendStyle = useStyle(style , position);
    const { primary } = useStyle();
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                <MaterialCommunityIcons style={{ marginRight : 10 }} name="star-four-points-outline" size={24} color={generateColor(primary , 8)} />
                <Para color={primary}>{client.static.REFRESH_ALERT_TEXT}</Para>
            </View>
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container  : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: "50%",
        marginHorizontal : "25%",
        backgroundColor : 'white',
        borderRadius : baseBorderRadius,
    },
    innerContainer: {
        flexDirection : 'row',
        padding: 15,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 2),
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default RefreshAlert;