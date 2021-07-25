import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Para from './Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder } from '../utils';


const InsuranceCart = ({ name , onItemPress , cat , id , webIcon }) => {
    const appendStyle = useStyle(style);

    return (
        <TouchableWithoutFeedback style={{ flex : 1 }} onPress={() => onItemPress({cat , name , id})}>
            <View style={appendStyle.container}>
                <Para size={18}>{name}</Para>
                <View style={appendStyle.bottomContainer}>
                    <Feather name="arrow-down-left" size={24} color="black" />
                    {
                        webIcon ? <Image style={{ marginBottom : 10 , opacity : .5 }} source={{
                            uri : imageFinder(webIcon),
                            width: 50,
                            height : 50
                        }} /> : null
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const style = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {
        width: "47%",
        marginBottom : "6%",
        backgroundColor : generateColor(primary , 9),
        height: 230,
        justifyContent : 'space-between',
        padding: 10,
        borderRadius : baseBorderRadius,
    },
    bottomContainer : {
        flexDirection : "row" , 
        justifyContent : 'space-between', 
        alignItems : 'center' 
    }
})


export default InsuranceCart;