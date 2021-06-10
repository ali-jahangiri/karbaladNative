import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Para from '../../components/Para';


const Spinner = () => (
    <View style={style.spinner}>
        <ActivityIndicator size={50} color="red" />
        <Para size={16} style={style.text}>خوش آمدید</Para>
    </View>
)

const style = StyleSheet.create({
    spinner :  {
        flex: 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {
        marginTop : 20,
    }
})

export default Spinner;