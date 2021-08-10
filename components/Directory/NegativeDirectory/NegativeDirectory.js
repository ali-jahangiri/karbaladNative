import React from 'react';
import { ScrollView, StyleSheet, View } from "react-native";

const NegativeDirectory = ({ children }) => {
    return (
        <View style={style.container}>
            {children}
        </View>
    )
}


const style = StyleSheet.create({
    container : {
        marginTop : -50,
        flex: 1,
        backgroundColor : 'white',
        paddingTop : 25,
        borderTopRightRadius : 30,
        borderTopLeftRadius : 30
    }
})

export default NegativeDirectory;