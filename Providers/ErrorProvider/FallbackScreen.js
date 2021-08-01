import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import client from '../../client';
import Para from '../../components/Para';


const FallbackScreen = ({ resetter , errMessage , trace }) => {
    const [extendErrorMessage, setExtendErrorMessage] = useState(false);
    return (
        <View style={style.container}>
            <Para>{client.static.ERROR_BOUNDARY_MAIN_MESSAGE}</Para>
            <Para>{errMessage}</Para>
            {/* <TouchableOpacity style={{ marginVertical : 10 }} onPress={() => setExtendErrorMessage(prev => !prev)} >
                <Para>نمایش ریشه</Para>
            </TouchableOpacity> */}
            {/* {
                extendErrorMessage ? <ScrollView> 
                <Para color="red" style={{ marginTop : 10 }}>{trace}</Para>
            </ScrollView> : null
            } */}
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
        marginTop : 20
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