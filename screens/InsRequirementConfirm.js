import React from 'react';
import { StyleSheet } from 'react-native';
import Para from '../components/Para';
import ScreenWrapper from '../components/ScreenWrapper';
import { useStyle } from '../Hooks/useStyle';


const InsRequirementConfirm = ({ route : { params } , navigation }) => {
    const appendStyle = useStyle(style);
    console.log(params , "params");

    return (
        <ScreenWrapper>
            <Para></Para>
        </ScreenWrapper>
    )
}

const style = () => StyleSheet.create({
    container : {

    },
})

export default InsRequirementConfirm;