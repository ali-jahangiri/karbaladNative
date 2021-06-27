import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Para from '../../components/Para';

const FallbackScreen = ({ resetter }) => {
    
    return (
        <View style={style.container}>
            <Para>
                مشکلی در پردازش رخ داده است ، مجددا تلاش نمایید
            </Para>
            <TouchableOpacity style={style.resetCta} onPress={resetter}>
                <Para align="center">تلاش مجدد</Para>
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