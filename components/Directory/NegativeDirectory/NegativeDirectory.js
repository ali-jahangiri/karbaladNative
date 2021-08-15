import React from 'react';
import { StyleSheet, View } from "react-native";

const NegativeDirectory = ({ children }) => (
    <View style={style.container}>
            {children}
    </View>
)


const style = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : 'white',
        borderTopRightRadius : 30,
        borderTopLeftRadius : 30,
        overflow: "hidden",
    }
})

export default NegativeDirectory;