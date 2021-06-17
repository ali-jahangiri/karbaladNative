import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';


const InsuranceConfirm = ({ route : { params } , navigation }) => {
    const appendStyle = useStyle(style);
    console.log(params);
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <Para></Para>
            </View>
        </View>
    )
}

const style = () => StyleSheet.create({
    container : {

    },
    header : {

    }
})


export default InsuranceConfirm;