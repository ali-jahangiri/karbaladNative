import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Para from '../../components/Para';
import client from '../../client';

const { DESC , TITLE } = client.static.OFFLINE

const OfflineFallbackScreen = () => {
    return (
        <View style={style.container}>
            <Feather style={{ marginBottom : 10 }} name="wifi-off" size={28} color="black" />
            <Para size={20} weight="bold">{TITLE}</Para>
            <Para align="center" size={15} color="grey">{DESC}</Para>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        padding: 25
    }
})

export default OfflineFallbackScreen;