import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';

const HomeUserProfileBox = () => {
    const appendedStyle = useStyle(style);
    const navigation = useNavigation();
    const redirectToUserProfile = () => navigation.navigate('profile');


    return (
        <TouchableOpacity style={appendedStyle.container} onPress={redirectToUserProfile}>
            <Feather name="user" size={24} color="black" />
        </TouchableOpacity>
    )
}


const style = ({ baseBorderRadius }) => StyleSheet.create({
    container : {
        backgroundColor : "#ffffff54",
        height : 50,
        width: 50,
        alignItems : 'center',
        justifyContent : 'center',
        // marginVertical : -25,
        borderRadius : Number(baseBorderRadius)
    }
})

export default HomeUserProfileBox;