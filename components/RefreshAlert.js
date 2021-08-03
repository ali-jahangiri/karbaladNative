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
            <MaterialCommunityIcons style={{ marginRight : 10 }} name="star-four-points-outline" size={24} color={generateColor(primary , 8)} />
            <Para color={primary}>{client.static.REFRESH_ALERT_TEXT}</Para>
        </View>
    )
}

const style = ({ primary , baseBorderRadius } , position) => StyleSheet.create({
    container  : {
        flexDirection : 'row',
        position: 'absolute',
        bottom: 0,
        borderRadius : baseBorderRadius,
        left: 0,
        width: "60%",
        marginHorizontal : "20%",
        padding: 15,
        backgroundColor : generateColor(primary , 1),
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default RefreshAlert;