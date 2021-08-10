import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';


const SimpleDirectory = ({ children }) => {
    return (
        <ScrollView style={style.container}>
            {children}
        </ScrollView>
    )
}


const style = StyleSheet.create({
    container : {
        
    }
})

export default SimpleDirectory;