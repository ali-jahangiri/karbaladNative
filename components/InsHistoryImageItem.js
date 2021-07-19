import React from 'react';
import { StyleSheet, View , Image } from 'react-native';
import { imageFinder } from '../utils';

import Para from './Para';

const InsHistoryImageItem = ({ src , index = 1 }) => {
    return (
        <View style={style.container}>
            <View style={style.container}>
                <Image source={{
                    uri : imageFinder(src),
                    height: 300,
                    width : "100%"
                }} />
            </View>
            <View style={style.overlay}>
                <Para weight="bold" color="white">تصویر شماره {index}</Para>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    container : {
        width : "100%",
    },
    overlay : {
        position: "absolute",
        width: "100%",
        backgroundColor : "rgba(0,0,0,0.6)",
        bottom: 0,
        padding: 20,
    }
})

export default InsHistoryImageItem;