import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput , View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';

const SearchBox = ({ value = "" , onChange , searchType = "default", placeholder = "نام مورد نطر خود را جستجو کنید" }) => {
    const appendStyle = useStyle(style)
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.searchContainer}>
                <Feather style={appendStyle.searchIcon} name="search" size={24} color="black" />
            </View>
            <TextInput
                keyboardType={searchType}
                style={appendStyle.input}
                placeholder={placeholder}
                onChangeText={onChange} 
                value={value} />
        </View>
    )
}

const style = ({ baseBorderRadius , primary}) => StyleSheet.create({
    container : {
        width: "100%",
        marginVertical : 10,
        borderWidth : 2,
        flexDirection :"row",
        alignItems : 'center',
        justifyContent : 'space-between',
        borderRadius : baseBorderRadius,
        borderColor : "rgba(0,0,0,0.1)",
        overflow: 'hidden'
    },
    input : {
        padding: 10,
        fontFamily : 'bold',
        color: "grey",
        fontSize : 15,
        flex : 1
    },
    searchIcon : {
        color: primary
    },
    searchContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        padding : 15,
        backgroundColor : generateColor(primary , 1)
    }
})

export default SearchBox;