import React from 'react';
import { StyleSheet, TextInput , View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';

const SearchBox = ({ value = "" , onChange , placeholder = "نام مورد نطر خود را جستجو کنید" }) => {
    const appendStyle = useStyle(style)

    return (
        <View style={appendStyle.container}>
            <TextInput 
            style={appendStyle.input}
            placeholder={placeholder}
            onChangeText={onChange} 
            value={value} />
        </View>
    )
}

const style = ({ baseBorderRadius , }) => StyleSheet.create({
    container : {
        width: "100%",
        marginVertical : 10
    },
    input : {
        borderWidth : 2,
        borderRadius : baseBorderRadius,
        padding: 10,
        borderColor : "rgba(0,0,0,0.25)",
        fontFamily : 'bold',
        color: "grey",
        fontSize : 15
    }
})

export default SearchBox;