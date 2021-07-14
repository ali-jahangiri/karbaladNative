import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import client from '../../client';
import Para from '../../components/Para';


const FallbackScreen = ({ resetter }) => {
    
    return (
        <View style={style.container}>
            <Para>{client.static.ERROR_BOUNDARY_MAIN_MESSAGE}</Para>
            <TouchableOpacity style={style.resetCta} onPress={resetter}>
                <Para align="center">{client.static.ERROR_BOUNDARY_ACTION_MESSAGE}</Para>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex: 1,
        alignItems : 'center',
        justifyContent : "center",
    },
    resetCta : {
        width : "70%",
        marginTop : 10,
        marginHorizontal : "15%",
        padding: 15,
        backgroundColor :"lightgrey"
    }
})

export default FallbackScreen;