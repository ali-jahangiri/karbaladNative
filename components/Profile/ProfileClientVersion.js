import React from 'react';
import { StyleSheet, View } from 'react-native';
import client from '../../client';
import Para from '../Para';

const ProfileClineVersion = () => (
    <View>
        <View style={style.container}>
            <Para color="lightgrey">{client.version}</Para>
            <Para color="lightgrey"> نسخه </Para>
        </View>
    </View>
)

const style = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
})
export default ProfileClineVersion;