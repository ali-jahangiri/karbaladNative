import React from 'react';
import { StyleSheet, View, } from 'react-native';


const SimpleDirectory = ({ children }) => {
    return (
        <View style={style.container}>
            {children}
        </View>
    )
}


const style = StyleSheet.create({
    container : {
        flex : 1,
    }
})

export default SimpleDirectory;