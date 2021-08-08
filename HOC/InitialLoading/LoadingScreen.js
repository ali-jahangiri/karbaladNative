import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Spinner = () => (
    <View style={style.spinner}>
        <ActivityIndicator size="large" color="lightgrey" />
    </View>
)

const style = StyleSheet.create({
    spinner :  {
        flex: 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
})

export default Spinner;