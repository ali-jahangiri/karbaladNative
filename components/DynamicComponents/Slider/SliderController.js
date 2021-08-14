import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const _position = {
    top : "5%",
    center : "50%",
    bottom : "90%"
}

const SliderController = ({ scrollToNext , scrollToPrev , color , bgColor , position }) => {
    const style = controllerStyle(position);
    return (
        <>
            <TouchableOpacity style={[style.item , { left : "0%" , backgroundColor : bgColor === "#ffffff" ? "transparent" : bgColor }]} onPress={scrollToPrev}>
                <Feather name="arrow-left" size={24} color={color || "black"} />
            </TouchableOpacity>
            <TouchableOpacity style={[style.item , { right : "0%" , backgroundColor : bgColor === "#ffffff" ? "transparent" : bgColor }]} onPress={scrollToNext}>
                <Feather name="arrow-right" size={24} color={color || "black"} />
            </TouchableOpacity>
        </>
    )
}


const controllerStyle = position => StyleSheet.create({
    item : {
        position: 'absolute',
        top: _position[position],
        padding : 15,
    }
})

export default SliderController;