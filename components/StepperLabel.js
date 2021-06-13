import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';


const StepperLabel = ({ title }) => {
    const appendStyle = useStyle(style)
    return (
        <View style={appendStyle.container} >
            <Para size={16} align="center" weight="bold" style={appendStyle.text}>
                {title}
            </Para>
        </View>
    )
}

const style = () => StyleSheet.create({
    container : {
        width : "100%",
        marginVertical : 30
    },  
    text : {

    }
})

export default StepperLabel;