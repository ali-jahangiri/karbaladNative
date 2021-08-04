import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import Para from '../Para';


const ProfileRow2 = ({ icon , title }) => {
    const appendStyle = useStyle(style);

    return (
        <View style={appendStyle.container}>
            <Para weight="bold">{title}</Para>
        </View>
    )
}


const style = () => StyleSheet.create({
    container : {

    }
})

export default ProfileRow2;